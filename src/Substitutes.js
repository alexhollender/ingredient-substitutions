import { useOutletContext } from "react-router-dom";
import SubstituteCategory from './SubstituteCategory';
import './scss/Substitutes.scss';

function Substitutes() {

  // AutoComplete sets currentItem (in Root's state)
  // Root passes it down to Substitutes via outletContext
  const [currentItem, substitutesByCategory] = useOutletContext();

  return (
    <section id="substitutes">
      <h2 className="label">Substitutes:</h2>
      {substitutesByCategory.map(({ category, items }) => {
        return <SubstituteCategory
          key={category}
          category={category}
          items={items}
        />
      })}
    </section>
  );
}

export default Substitutes;
