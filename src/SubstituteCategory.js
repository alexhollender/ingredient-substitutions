import SubstituteItem from './SubstituteItem';
import { capitalize } from './functions/formatText';
import './scss/SubstituteCategory.scss';

function SubstituteCategory({ category, items }) {

  return (
    <ul className="SubstituteCategory">
      <h3>{capitalize(category)}</h3>
      {items.map(({ substituteName, proportion, note, score }, index) => {
        return <SubstituteItem
          key={substituteName}
          index={index}
          substituteName={substituteName}
          proportion={proportion}
          note={note}
          score={score}
        />
      })}
    </ul>
  )
}

export default SubstituteCategory;
