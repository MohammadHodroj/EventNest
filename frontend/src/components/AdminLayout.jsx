import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className="Admin">
        <header className="adminHeader">
          <h1>Admin Dashboard</h1>
        </header>
        <nav className="adminNav">
          <ul>
            <li>
              <Link to="/admin/users-list">Users</Link>
            </li>
            <li>
              <Link to="/admin/venues-list">Venues</Link>
            </li>
            <li>
              <Link to="/admin/events-list">Events</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default AdminLayout;
