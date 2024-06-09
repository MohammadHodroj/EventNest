import { useEffect, useCallback } from "react";

const Bookings = () => {
  const fillUserCards = () => {
    if (!sessionStorage.getItem("email")) {
      window.location.href = "/login";
      return;
    }
    const userId = parseInt(sessionStorage.getItem("userId"));
    console.log(sessionStorage.getItem("userId"));
    fetch(`https://localhost:44351/api/Bookings/GetBookings/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        return response.json();
      })
      .then((data) => {
        const container = document.getElementById("cardContainer");

        // Clear the container to prevent duplicate renderings
        container.innerHTML = "";

        if (data.length === 0) {
          container.innerHTML = "You have no bookings";
          return;
        }

        data.forEach((booking) => {
          const cardDiv = document.createElement("div");
          cardDiv.id = `bookingCard_${booking.event.id}`; // Add unique ID for each card
          cardDiv.style.cssText = `
            width: 300px;
            margin: 10px;
            text-align: center;
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
          `;

          const nameElement = document.createElement("h3");
          nameElement.style.margin = "10px 0";
          nameElement.innerText = booking.event.name;

          const hrElement = document.createElement("hr");
          hrElement.style.width = "50%";
          hrElement.style.margin = "10px auto";

          const descriptionElement = document.createElement("p");
          descriptionElement.style.textAlign = "center"; // Centered description
          descriptionElement.innerText = booking.event.description;

          const deleteButton = document.createElement("button");
          deleteButton.type = "button";
          deleteButton.className = "btn btn-danger";
          deleteButton.textContent = "Delete";
          deleteButton.onclick = (event) => {
            event.preventDefault();
            deleteBooking(booking.event.id);
          };

          cardDiv.append(
            nameElement,
            hrElement,
            descriptionElement,
            deleteButton
          );
          container.appendChild(cardDiv);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteBooking = useCallback((bookingId) => {
    console.log("Deleting booking with ID:", bookingId);

    fetch(
      `https://localhost:44351/api/Bookings/DeleteBooking?userId=${sessionStorage.getItem(
        "userId"
      )}&eventId=${bookingId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete booking");
        }
        const cardToRemove = document.getElementById(
          `bookingCard_${bookingId}`
        );
        if (cardToRemove) {
          cardToRemove.remove();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    fillUserCards();
  });

  return (
    <div>
      <div className="container"></div>
      <aside>
        <div>
          <ul>
            <li>
              <div></div>
              <div>
                <div>
                  <div>
                    <div></div>
                  </div>
                  <div id="cardContainer"></div>
                  <div></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Bookings;
