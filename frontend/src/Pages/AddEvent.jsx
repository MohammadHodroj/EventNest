import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const AddEvent = () => {
  const [categories, setCategories] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const nameRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();
  const categoryRef = useRef();
  const locationRef = useRef(); // Step 1: Define a ref for location input
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("https://localhost:44351/api/Category/GetCategories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setErrorMsg("Failed to fetch categories. Please try again.");
      });
  };

  const handleAddEvent = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const desc = descRef.current.value;
    const date = dateRef.current.value;
    const categoryId = categoryRef.current.value;
    const location = locationRef.current.value; // Step 3: Access location value
    const data = {
      name,
      description: desc,
      date,
      categoryId,
      location, // Include location in the data object
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("https://localhost:44351/api/Events/AddEvent", options)
      .then((response) => {
        console.log("Response status:", response.status);
        const contentType = response.headers.get("content-type");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          return response.text(); // Handle non-JSON response
        }
      })
      .then((data) => {
        if (typeof data === "string") {
          console.log("Event added successfully:", data);
          setErrorMsg("Event added successfully!");
        } else {
          console.log("Event added successfully:", data);
          setErrorMsg("Event added successfully!");
        }
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMsg("Error adding event. Please try again.");
      });
  };

  return (
    <div style={{ padding: 40 }} className="center">
      <h1>Add Event</h1>
      <form onSubmit={handleAddEvent}>
        <div className="txt_field">
          <input type="text" id="name" name="name" ref={nameRef} required />
          <span></span>
          <label>Event Name</label>
        </div>
        <div className="txt_field">
          <input
            id="description"
            name="description"
            ref={descRef}
            required
          ></input>
          <span></span>
          <label>Description</label>
        </div>
        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <input type="date" id="date" name="date" ref={dateRef} required />
          <span></span>
        </div>
        <div className="txt_field">
          <input
            type="text"
            id="location" // Step 2: Add location input field
            name="location"
            ref={locationRef}
            required
          />
          <span></span>
          <label>Location</label>
        </div>
        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <select id="category" ref={categoryRef} required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.name}
              </option>
            ))}
          </select>
          <span></span>
        </div>
        <Button variant="contained" color="primary" type="submit">
          Add Event
        </Button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};

export default AddEvent;
