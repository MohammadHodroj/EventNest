import { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button"; // Import Button component from MUI

const Home = () => {
  const [events, setEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const eventsSectionRef = useRef(null);

  const fetchCards = async () => {
    try {
      const response = await fetch(
        "https://localhost:44351/api/Events/GetEvents"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      sessionStorage.setItem("cards", JSON.stringify(data));
      setEvents(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const displayedEvents = showAll ? events : events.slice(-6);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  const handleScrollToEvents = () => {
    eventsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        <div
          style={{
            backgroundImage: `url(/assets/bg-img.jpg)`, // Updated background image URL
            height: "100vh",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "3em", // Increased font size
              marginBottom: "20px",
            }}
          >
            View Our Interesting Events!!
          </h2>
          {/* MUI Button for "View Events" */}
          <Button
            variant="contained"
            color="success"
            onClick={handleScrollToEvents}
            style={{ padding: "10px 20px", fontSize: "1em" }}
          >
            View Events
          </Button>
        </div>
        <div
          ref={eventsSectionRef}
          style={{ padding: "50px 0", textAlign: "center" }}
        >
          <h1 style={{ textDecoration: "underline" }}>Our Awesome Events</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {displayedEvents.map((event) => (
              <div
                key={event.id}
                style={{
                  width: "300px",
                  margin: "10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h3 style={{ margin: "10px 0" }}>{event.name}</h3>
                <hr style={{ width: "50%", margin: "10px auto" }} />
                <p>{event.description}</p>
                <Button
                  variant="contained"
                  color="primary"
                  href={`/cardDetails?id=${event.id}`}
                  style={{
                    marginTop: "10px",
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  More Info
                </Button>
              </div>
            ))}
          </div>
          {events.length > 6 && !showAll && (
            <button
              onClick={handleShowMore}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "1em",
              }}
            >
              Show More
            </button>
          )}
          {showAll && (
            <button
              onClick={handleShowLess}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "1em",
              }}
            >
              Show Less
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
