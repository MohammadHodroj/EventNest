import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import UsersList from "./UsersList";
import EventsList from "./EventsList";
import AdminLayout from "../components/AdminLayout";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="events-list" element={<EventsList />} />
        <Route path="users-list" element={<UsersList />} />
      </Route>
    </Routes>
  );
};

export default Admin;
