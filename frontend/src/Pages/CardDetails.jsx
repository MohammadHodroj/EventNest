import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button"; // Import Button component from MUI

const CardDetails = () => {
  const navigate = useNavigate();

  const BookEvent = () => {
    const userId = sessionStorage.getItem("userId");
    const url = new URL(window.location.href);
    const eventId = url.searchParams.get("id");

    if (!userId || !eventId) {
      console.error("Missing userId or eventId");
      return;
    }

    const bookingData = {
      userID: parseInt(userId),
      eventID: parseInt(eventId),
    };

    fetch("https://localhost:44351/api/Bookings/AddBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Booking successful:", data);
        // Fetch updated event details to update participants count
        fetchEventDetails(eventId);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchEventDetails = (eventId) => {
    fetch(`https://localhost:44351/api/Events/GetEventDetails/${eventId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update session storage and re-render the component
        const cards = JSON.parse(sessionStorage.getItem("cards"));
        const updatedCards = cards.map((card) =>
          card.id === data.id ? data : card
        );
        sessionStorage.setItem("cards", JSON.stringify(updatedCards));
        cardDetails();
        // Navigate to my-bookings after updating event details
        navigate("/my-bookings");
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  };

  const cardDetails = () => {
    if (!sessionStorage.getItem("userId")) {
      window.location.href = "/login";
      return;
    }
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const selectedCard = JSON.parse(sessionStorage.getItem("cards")).find(
      (card) => card.id === parseInt(id)
    );

    if (!selectedCard) {
      console.error("Card not found");
      return;
    }

    const formattedDate = selectedCard.date.split("T")[0];

    const sliderTextInner = (
      <div style={{ display: "flex", marginTop: "50px", gap: "40px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            textAlign: "center", // Centered text
            backgroundColor: "white", // White background
            padding: "20px", // Add padding
            borderRadius: "8px", // Add border radius
          }}
        >
          <h1 style={{ fontSize: "2rem" }}>{selectedCard.name}</h1>{" "}
          {/* Bigger font size */}
          <h3>Location: {selectedCard.location}</h3> {/* Display location */}
          <h3 style={{ marginBottom: "20px" }}>{formattedDate}</h3>
          <p style={{ fontSize: "1.2rem", margin: "5px" }}>
            {selectedCard.description}
          </p>{" "}
          {/* Bigger font size */}
          <h3>Participants: {selectedCard.participantsCount}</h3>
          <div>
            <Button variant="contained" color="success" onClick={BookEvent}>
              Book Event
            </Button>{" "}
            {/* MUI Button */}
          </div>
          <br />
          <form style={{ width: "70%" }}>
            <h2 style={{ margin: "5px", fontSize: "1.5rem" }}>Rate event:</h2>{" "}
            {/* Bigger font size */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <label htmlFor="rating">Rating:</label>
                <input
                  type="range"
                  id="rating"
                  name="rating"
                  min="0"
                  max="5"
                  style={{ width: "100%" }}
                  step="1"
                />
              </div>
              <div>
                <label htmlFor="comment">Comment:</label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="2"
                  cols="20"
                ></textarea>
              </div>
            </div>
            <div>
              <Button variant="contained" color="primary" onClick={rate}>
                Rate
              </Button>{" "}
              {/* MUI Button */}
            </div>
          </form>
        </div>
      </div>
    );

    const container = document.getElementById("details");
    const root = createRoot(container);
    root.render(sliderTextInner);
  };

  const rate = (event) => {
    event.preventDefault();
    const url = new URL(window.location.href);
    const id = parseInt(url.searchParams.get("id"));
    const rateData = {
      userID: sessionStorage.getItem("userId"),
      eventID: id,
      rate: parseInt(document.getElementById("rating").value),
      description: document.getElementById("comment").value,
      createdDate: new Date().toISOString(),
    };

    fetch("https://localhost:44351/api/Rating/AddRating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rateData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        document.querySelector("form").style.display = "none";
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    cardDetails();
  });

  return (
    <div>
      <aside>
        <div>
          <ul>
            <li>
              <div></div>
              <div
                style={{ display: "flex", justifyContent: "center" }}
                id="details"
              ></div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default CardDetails;
