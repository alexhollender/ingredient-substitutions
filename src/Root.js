import { useState } from 'react';
import { Outlet } from "react-router-dom";
import AutoComplete from './AutoComplete';
import Header from './Header';
import './scss/Root.scss';

function Root() {

  const [currentItem, setCurrentItem] = useState([]);
  const [substitutesByCategory, setSubstitutesByCategory] = useState([]);

  return (
    <div className="App">
      <Header />
      <main>
        <AutoComplete
          setCurrentItem={setCurrentItem}
          setSubstitutesByCategory={setSubstitutesByCategory}
          />
        <Outlet context={[currentItem, substitutesByCategory]} />
      </main>
    </div>
  );
}

export default Root;
