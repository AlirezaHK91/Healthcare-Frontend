import React from "react";
import "./Bookingpage.css";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

function BookingPage() {
  return (
    <div className="container">
      <div className="flex-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            padding: "20px",
          }}
        >
          <form className="form" action="">
            <div className="input-fields">
              <input
                className="name-field"
                type="text"
                placeholder="Full name"
              />
              <input
                className="description-field"
                type="text"
                placeholder="Describe your problem"
              />
            </div>
            <button className="btn">General Practitioner</button>
            <button className="btn" style={{ marginBottom: "20px" }}>
              Nurse
            </button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["StaticDateTimePicker"]}>
                <StaticDateTimePicker
                  defaultValue={dayjs("2022-04-17T15:30")}
                />
              </DemoContainer>
            </LocalizationProvider>
            <button className="book-btn">Book</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default BookingPage;
