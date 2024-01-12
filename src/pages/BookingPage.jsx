import React, { useEffect, useState } from "react";
import "./Bookingpage.css";
import axios from "axios";
import { TextField } from "@mui/material";
import { style } from "@mui/system";
import spec from "../assets/spec.png"
import prac from "../assets/perac.png"

const apiUrl = import.meta.env.VITE_API_URL;

function BookingPage() {
  const [schedules, setSchedules] = useState([]);
  const [speciality, setSpeciality] = useState("");
  const [scheduleId, setScheduleId] = useState(0);
  const [user, setUser] = useState(0);
  const [clickedSchedule, setClickedSchedule] = useState(null);
  const [hoveredSchedule, setHoveredSchedule] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser.id);
    }
    console.log(user);
  }, []);

  const handleInput = (e) => {
    if (e.target.name === "speciality") {
      setSpeciality(e.target.value);
    }

    console.log(e.target.schedule);
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user !== 0 && scheduleId !== 0 && speciality !== 0) {
      try {
        await axios.post(`${apiUrl}/api/auth/booking`, booking, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setSuccessMessage("Booking confirmed");
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error confirming booking. Please try again.");
        console.log("Error from client ", error.message);
        setSuccessMessage("");
      }
    } else {
      setErrorMessage("Please fill in all required fields");
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      schedule: { id: scheduleId },
      user: { id: user },
    }));
  }, [scheduleId]);

  const [booking, setBooking] = useState({
    user: { id: user },
    description: "",
    schedule: { id: scheduleId },
    speciality: speciality,
  });

  useEffect(() => {
    console.log("Fetching schedules...");
    const getSchedules = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/auth/schedule/get-all`,
          {
            withCredentials: true,
          }
        );
        const scheduleData = response.data;
        const scheduleAvailable = scheduleData.filter(
          (schedule) => schedule.isAvailable
        );
        setSchedules(scheduleAvailable);
      } catch (error) {
        console.error("Error fetching scedules:", error.message);
      }
    };
    getSchedules();
  }, []);

  const filterBySpeciality = (speciality, schedules) => {
    if (speciality === "") {
      return schedules;
    } else {
      return schedules.filter(
        (schedule) => schedule.speciality === speciality && schedule.isAvailable
      );
    }
  };

  return (
    <>
    <div
      className="form-toggle mb-4 mt-10 w-96 mx-auto flex items-center justify-center lg:px-8"
      style={{
       cursor: "pointer",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "20px",
      backgroundColor: "#A3B8CB",
      color: "#000",
      textAlign: "center",
      display: "flex",
      flexDirection: "row", // Set flex direction to row
  }}
>
  <span style={{ fontSize: "17px"}}>
    Booking appointments
  </span>
  <img className="w-6 ml-2" src={spec} alt="" />
</div>
    <div className="container -mt-14">
      <div className="flex-container flex-co flex flex-1">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "85%",
            padding: "20px",
            alignItems: "center"
          }}
        >
          <form className="form">
            <select
              name="speciality"
              className="block border-2 border-[#575757] mt-6 w-full p-1 rounded-lg mb-4 appearance-none focus:outline-none focus:border-blue"
              value={speciality}
              onChange={handleInput}
            >
              <option>
                Select Speciality
              </option>
              <option value="GENERAL_PRACTITIONER">General Practitioner</option>
              <option value="DISTRICT_NURSE">District Nurse</option>
              <option value="PHYSIOTHERAPIST">Physiotherpaist</option>
              <option value="CURATOR">Curator</option>
              <option value="FOOT_THERAPIST">Foot Therapist</option>
              <option value="MIDWIFE">Midwife</option>
              <option value="PSYCHOLOGIST">Psychologist</option>
              <option value="BVC_NURSE">Bvc Nurse</option>
            </select>

            <div className="mb-4 w-full mx-auto flex-1 flex flex-col items-center justify-center">
          <textarea
            type="text"
            placeholder="Describe your problem"
            rows={5}
            onChange={handleInput}
            name="description"
            className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4 mt-4 appearance-none focus:outline-none focus:border-blue"
          />
          </div>

            {schedules.length === 0 ? (
              <p className="text-center text-lg mb-2">
                No available times to book.
              </p>
            ) : (
            <ul>
              <p className="text-center text-lg mb-2">
                Available times
              </p>
              {filterBySpeciality(speciality, schedules).map((schedule) => (
                
                <li
                className={`mb-3 border-4 border-gray-400 bg-gray-300 rounded p-2 ${clickedSchedule === schedule.id ? 'selected-booking' : ''} ${hoveredSchedule === schedule.id ? 'hovered-booking' : ''}`}
                  key={schedule.id}
                  onClick={() => {
                    setScheduleId(clickedSchedule === schedule.id ? 0 : schedule.id);
                    setClickedSchedule(clickedSchedule === schedule.id ? null : schedule.id);
                  }}
                  name="scheduleId"
                  value={schedule.id}
                  style={{ fontSize: "12px" }}
                >
                  <strong>Date:</strong> {schedule.date}
                  <br />
                  <strong>Time:</strong> {schedule.time}
                  <br />
                  <strong>Specialist:</strong> {schedule.speciality} <img className="inline-block w-7 mb-5" src={prac} alt="" />
                  <br />
                </li>
              ))}
            </ul>
            )}
            <button className="book-btn bg-[#82a9ab]" onClick={(e) => handleSubmit(e)}>
              Book
            </button>
            
            {errorMessage && <p className="text-red-500 mt-4 text-center text-lg">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-700 text-md mt-4 text-center">{successMessage}</p>
        )}
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default BookingPage;
