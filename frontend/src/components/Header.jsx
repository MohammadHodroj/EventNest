import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  let isAdmin = false;
  const isLoggedIn = sessionStorage.getItem("login");
  isAdmin = sessionStorage.getItem("isadmin") === "True";
  return (
    <>
      <header className="header">
        <nav className="nav container">
          <Link to="/" className="nav__logo">
            EventNest
          </Link>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link
                  className="nav__link"
                  to="/addEvent"
                  role="button"
                  aria-expanded="false"
                >
                  Add Event
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  className="nav__link"
                  to="/my-bookings"
                  role="button"
                  aria-expanded="false"
                >
                  View My Bookings
                </Link>
              </li>
              {isAdmin && (
                <li className="nav__item">
                  <Link
                    className="nav__link"
                    to="/dash"
                    role="button"
                    aria-expanded="false"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="nav__actions">
            {/* login button */}
            <div id="loginBtn">
              {isLoggedIn ? (
                <Link
                  to="/"
                  onClick={() => {
                    sessionStorage.removeItem("login");
                    sessionStorage.removeItem("isadmin");
                  }}
                >
                  Logout
                </Link>
              ) : (
                <Link to="/login" onClick={handleLogin}>
                  Login
                </Link>
              )}
            </div>
            <div className="nav__toggle" id="nav-toggle">
              <i className="ri-menu-line"></i>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
