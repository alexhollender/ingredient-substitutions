import { useState, useEffect } from 'react';
import { Outlet, useParams } from "react-router-dom";
import { searchIndex } from './data/algoliasearchclient';
import { categorizeSubstitutes } from './functions/categorizeSubstitutes.js';
import AutoComplete from './AutoComplete';
import Header from './Header';
import './scss/Root.scss';

function Root() {

  const [currentItem, setCurrentItem] = useState([]);
  const [substitutesByCategory, setSubstitutesByCategory] = useState([]);
  const { ingredient } = useParams();

  useEffect(() => {
    console.log(ingredient)
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
            setSubstitutesByCategory(categorizeSubstitutes(hits[0].substitutes))
          }
        // need to build out an error state here
        } else {
          console.log('ingredient not found')
        }
      });
    }
  }, [ingredient]);

  return (
    <div className="App">
      <Header />
      <main>
        <AutoComplete currentItem={currentItem} />
        { !ingredient ? <p>suggestions</p> : null }
        <Outlet context={[currentItem, substitutesByCategory]} />
      </main>
    </div>
  );
}

export default Root;
