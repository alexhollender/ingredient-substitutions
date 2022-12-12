import { useState, useEffect, useMemo, useRef } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { useParams } from "react-router-dom";
import SearchResultItem from './SearchResultItem';
import { searchIndex, searchClient } from './data/algoliasearchclient';
import { substituesByCategory } from './functions/substitutesByCategory';
import './scss/AutoComplete.scss';
import searchIcon from './assets/search-icon.svg';

function AutoComplete({ setCurrentItem, setSubstitutesByCategory }) {

  // tracks the state of autocomplete
  const [autocompleteState, setAutocompleteState] = useState({})
  // sets the input for autocomplete
  const inputRef = useRef(null)
  // gets whatever is after the '/' in the URL
  const { ingredient } = useParams()

  useEffect(() => {
    // check if there is already an ingredient in the URL
    if (ingredient) {
      console.log(`(via URL) getting data for: ${ingredient}`)
      searchIndex.search(ingredient).then(({ hits }) => {
        // if there is at least one hit
        if (hits.length > 0) {
          // if the ingredient in the URL doesn't match the ID of the first hit
          // update it so it matches the ID (this is purely cosmetic)
          if (ingredient !== hits[0].id) {
            window.location.href = hits[0].id
          // if it already matches, search for the item
          } else {
            setCurrentItem(hits[0])
            setSubstitutesByCategory(substituesByCategory(hits[0].substitutes))
            // updates the input field with ingredient name
            autocomplete.setQuery(hits[0].ingredientName)
          }
        // need to build out an error state here
        } else {
          console.log('ingredient not found')
        }
      });
    }
  }, [ingredient]);

  const autocomplete = useMemo(() =>
    createAutocomplete({
      onStateChange({ state }) {
        // Synchronize the Autocomplete state with the React state.
        setAutocompleteState(state);
        // if input is cleared, reset the app
        // if (ingredient && state.query.length < 1) {
        //   console.log('input was cleared')
        //   window.location.href = '/'
        // }
        console.log(ingredient)
      },
      id: 'autocomplete',
      placeholder: 'Search for an ingredient',
      autoFocus: !ingredient,
      openOnFocus: !ingredient,
      getSources() {
        return [
          {
            sourceId: 'ingredients',
            getItemInputValue({ item }) {
              return item.query;
            },
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'ingredient substitutions',
                    query,
                    params: {
                      hitsPerPage: 4,
                      highlightPreTag: '<mark>',
                      highlightPostTag: '</mark>',
                    },
                  },
                ],
              });
            },
            onSelect: function (event) {
              console.log(`(via select) getting data for: ${event.item.ingredientName}`)
              setCurrentItem(event.item)
              setSubstitutesByCategory(substituesByCategory(event.item.substitutes))
              // updates the input field with selected ingredient name
              event.setQuery(event.item.ingredientName)
              // remove focus from input
              document.activeElement.blur()
            },
          },
        ];
      },
    }),
  []);

  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <form
        className="aa-Form"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <label className="label" htmlFor="ingredient-input">Ingredient:</label>
        <div id="input-container">
          <img src={searchIcon} />
          <input id="ingredient-input" ref={inputRef} {...autocomplete.getInputProps({})} />
        </div>
      </form>
      <div className="aa-Panel" {...autocomplete.getPanelProps({})}>
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;

            return (
              <div key={`source-${index}`} className={"aa-Source"}>
                {items.length > 0 && (
                  <ul className="aa-List" {...autocomplete.getListProps()}>
                    {items.map((item) => (
                      <SearchResultItem
                        key={item.objectID}
                        autocomplete={autocomplete}
                        source={source}
                        item={item}
                      />
                    ))}
                  </ul>
                )}
              </div>
            );

          })}
      </div>
    </div>
  );
}

export default AutoComplete;
