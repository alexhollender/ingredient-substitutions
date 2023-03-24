import { Link } from "react-router-dom";
import './scss/Suggestions.scss';

function Suggestions() {
  return (
    <div id="suggestions">
      <h2>For example:</h2>
      <ul>
        <li><Link to="dill">Dill</Link></li>
        <li><Link to="paprika">Paprika</Link></li>
        <li><Link to="vanilla_extract">Vanilla extract</Link></li>
      </ul>
    </div>
  );
}

export default Suggestions;
