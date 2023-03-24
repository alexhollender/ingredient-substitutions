import { Link } from "react-router-dom";
import './scss/Suggestions.scss';

function Suggestions() {
  return (
    <div id="suggestions" className="panel">
      <h2>For example</h2>
      <ul>
        <Link to="dill"><li className="font-ingredient">Dill</li></Link>
        <Link to="anise"><li className="font-ingredient">Anise</li></Link>
        <Link to="vanilla_extract"><li className="font-ingredient">Vanilla extract</li></Link>
      </ul>
    </div>
  );
}

export default Suggestions;
