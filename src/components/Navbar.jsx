import { Link } from "react-router-dom";
import Theme from "./Theme";

function Navbar(props) {
  const { user } = props;
  const { theme, setTheme } = props;

  const toggleTheme = (x) => {
    setTheme(x);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            bookLet
          </Link>
        </div>
        <div className="flex-none gap-4">
          <Theme theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </>
  );
}

export default Navbar;
