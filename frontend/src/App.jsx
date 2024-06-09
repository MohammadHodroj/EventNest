import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CardDetails from "./Pages/CardDetails";
import Bookings from "./Pages/Bookings";
import AddEvent from "./Pages/AddEvent";
import OutletLayout from "./components/OutletLayout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./dashboard/Dashboard";
import Users from "./dashboard/Users";
import BookingsDash from "./dashboard/BookingsDash";
import EventsDash from "./dashboard/EventsDash";
import Categories from "./dashboard/Categories";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OutletLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="addEvent" element={<AddEvent />} />
        <Route path="my-bookings" element={<Bookings />} />
        <Route path="carddetails" element={<CardDetails />} />
      </Route>
      <Route path="dash" element={<Dashboard />} />
      <Route path="users-dash" element={<Users />} />
      <Route path="bookings-dash" element={<BookingsDash />} />
      <Route path="events-dash" element={<EventsDash />} />
      <Route path="categories-dash" element={<Categories />} />
    </Routes>
  );
}

export default App;
