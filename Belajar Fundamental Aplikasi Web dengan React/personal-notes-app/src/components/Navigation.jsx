import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiLogOut, FiPlusCircle } from "react-icons/fi";
import ThemeContext from "../contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

function Navigation({ logout, name }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <nav className="navigation">
      <ul>
        <li>
          <button onClick={toggleTheme}>
            {theme === "light" ? (<FaMoon/>) : (<FaSun/>)}
          </button>
        </li>
        <li>
          <Link to="/">
            <FiHome />
          </Link>
        </li>
        <li>
          <Link to="/notes/new">
            <FiPlusCircle />
          </Link>
        </li>
        <li>
          <button onClick={logout}>
            {name} <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
