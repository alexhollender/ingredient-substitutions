import { Link } from "react-router-dom";
import './scss/Header.scss';

function Header() {
  return (
    <header>
      <div>  
        <Link to="/" id="home"><h1>Ingredient substitutions</h1></Link>
        <h2>substitutions for common ingredients</h2>
      </div>
    </header>
  );
}

export default Header;
