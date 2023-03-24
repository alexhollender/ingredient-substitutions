import { Link } from "react-router-dom";
import './scss/SearchResultItem.scss';

function SearchResultItem({ autocomplete, source, item }) {

  return (
    <Link to={item.id}>
      <li
        className="aa-SearchResultItem font-ingredient"
        {...autocomplete.getItemProps({
          item,
          source,
        })}
      >
        {item.ingredientName}
      </li>
    </Link>
  )
}

export default SearchResultItem;
