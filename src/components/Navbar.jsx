import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="fade-in">
      <h2>✨ Creatorverse</h2>
      <div>
        <Link to="/">🏠 Home</Link>
        <Link to="/add">➕ Add Creator</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
