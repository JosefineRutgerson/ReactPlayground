import { Link, useLocation } from "react-router-dom";
import NavIcon from "./NavIcon";
import NavIcons from "./NavIcons";

export default function Nav() {
  const location = useLocation();

  const iconStrings = ["king", "queen", "knight", "bishop"];
  const scrambledIcons = shuffle(iconStrings)

  const icons = scrambledIcons.map(name => NavIcons[name] || NavIcons["default"]);

  return (
    <nav className="nav">
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <img src={icons[0]} /><Link to="/">Tic Tac Toe</Link>
        </li>
        <li className={location.pathname === "/memory" ? "active" : ""}>
          <img src={icons[1]} /><Link to="/memory">Memory</Link>
        </li>  
        <li className={location.pathname === "/about" ? "active" : ""}>
          <img src={icons[2]} /><Link to="/about">About</Link>
        </li>       
      </ul>
    </nav>
  );
}

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]; // swap
  }
  return result;
}