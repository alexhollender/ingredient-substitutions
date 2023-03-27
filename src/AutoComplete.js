import { useState, useEffect, useMemo, useRef } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { useParams } from "react-router-dom";
import { searchClient } from './data/algoliasearchclient';
import SearchResultItem from './SearchResultItem';
import './scss/AutoComplete.scss';
import searchIcon from './assets/search-icon.svg';

function AutoComplete({ currentItem }) {

  // tracks the state of autocomplete
  const [autocompleteState, setAutocompleteState] = useState({})
  // sets the input for autocomplete
  const inputRef = useRef(null)
  // for deciding to autofocus the input or not
  const { path } = useParams()
  const media = window.matchMedia("(max-width: 600px)")
  const isMobile = media.matches

  useEffect(() => {
    // check if there is an item loaded into <Root>'s state
    if (currentItem.id) {
      console.log('autocomplete rendered with', currentItem.ingredientName)
      // update the search field with ingredient name
      autocomplete.setQuery(currentItem.ingredientName)
    } else {
      console.log('autocomplete rendered empty')
      autocomplete.setQuery('')
    }
  }, [currentItem]);

  const autocomplete = useMemo(() =>
    createAutocomplete({
      onStateChange({ state }) {
        // Synchronize the Autocomplete state with the React state
        setAutocompleteState(state);
      },
      id: 'autocomplete',
      placeholder: 'Search for an ingredient',
      autoFocus: !path && !isMobile,
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
        <div id="input-container">
          <img src={searchIcon} />
          <input id="ingredient-input" className="font-ingredient" ref={inputRef} {...autocomplete.getInputProps({})} />
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
            })
          }
        </div>
    </div>
  );
}

export default AutoComplete;
