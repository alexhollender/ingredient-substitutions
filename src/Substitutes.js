import { useOutletContext } from "react-router-dom";
import SubstituteCategory from './SubstituteCategory';
import './scss/Substitutes.scss';

function Substitutes() {

  // From <Root>
  const substitutesByCategory = useOutletContext();

  return (
    <section id="substitutes" className="panel">
      <h2>Substitutes</h2>
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
