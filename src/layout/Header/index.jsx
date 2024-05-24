import { Link } from "react-router-dom";

import "./styles.css";
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <nav className="fixed-navigation">
      <Link to="/">
        <img className="logo" src={logo} />
      </Link>

      <ul className="nav-links">
        <li>
          <a className="nav-link" href="#">
            Home
          </a>
        </li>
        <li>
          <a className="nav-link" href="#browse">
            Browse
          </a>
        </li>
        <li>
          <a className="nav-link" href="#rent">
            Rent with us
          </a>
        </li>

        <Link to="signin" className="nav-link">
          <button className="button primary">Log in</button>
        </Link>
      </ul>
      <button className="button primary hidden">Menu</button>
    </nav>
  );
};

export default Header;
