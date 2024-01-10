import React from "react";
import "./Bookingpage.css";

function BookingPage() {
  return (
    <div>
      <div className="header" style={{ color: "red" }}>
        Welcome to the Booking page!
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <form action="">
          <div className="input-fields">
            <input type="text" placeholder="Full name" />
            <input type="text" placeholder="Describe your problem" />
          </div>
          <button>General Practitioner</button>
          <button>Nurse</button>
        </form>
      </div>
    </div>
  );
}
export default BookingPage;
