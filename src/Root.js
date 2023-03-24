import { useState, useEffect } from 'react';
import { Outlet, useParams } from "react-router-dom";
import { searchIndex } from './data/algoliasearchclient';
import { categorizeSubstitutes } from './functions/categorizeSubstitutes.js';
import Header from './Header';
import AutoComplete from './AutoComplete';
import Suggestions from './Suggestions';
import './scss/Root.scss';

function Root() {

  const [currentItem, setCurrentItem] = useState([]);
  const [substitutesByCategory, setSubstitutesByCategory] = useState([]);
  const { path } = useParams();

  useEffect(() => {
    console.log('the path is', path)
    // check if there is already an ingredient in the URL
    if (path) {
      searchIndex.search(path).then(({ hits }) => {
        // if there is at least one hit
        if (hits.length > 0) {
          setCurrentItem(hits[0])
          setSubstitutesByCategory(categorizeSubstitutes(hits[0].substitutes))
        // need to build out an error state here
        } else {
          console.log('ingredient not found')
        }
      });
    } else {
      setCurrentItem([])
      setSubstitutesByCategory([])
    }
  }, [path]);

  return (
    <div className="App">
      <Header />
      <main>
        <AutoComplete currentItem={currentItem} />
        { !path ? <Suggestions /> : null }
        <Outlet context={[currentItem, substitutesByCategory]} />
      </main>
    </div>
  );
}

export default Root;
