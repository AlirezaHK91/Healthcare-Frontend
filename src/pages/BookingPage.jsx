import React, { useEffect, useState } from "react";
import "./Bookingpage.css";
import axios from "axios";
import { TextField } from "@mui/material";
import { style } from "@mui/system";

const apiUrl = import.meta.env.VITE_API_URL;

function BookingPage() {
  const [schedules, setSchedules] = useState([]);
  const [speciality, setSpeciality] = useState("");
  const [scheduleId, setScheduleId] = useState(0);
  const [user, setUser] = useState(0);
  const [clickedSchedule, setClickedSchedule] = useState(null);
  const [hoveredSchedule, setHoveredSchedule] = useState(null);
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
        alert("Booking confirmed");
      } catch (error) {
        console.log("Error from client ", error.message);
      }
    } else {
      alert("Please fill in all required fields");
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
    <div className="container">
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
          <h6 style={{fontSize:"20px", fontFamily:"sa"}}>Booking</h6>
          <form className="form">
            <select
              name="speciality"
              className="block border-2 border-[#575757] mt-6 w-full p-1 rounded-lg mb-4 appearance-none focus:outline-none focus:border-blue"
              value={speciality}
              onChange={handleInput}
            >
              <option value="" disabled>
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
            placeholder="Describe your problem"
            rows={5}
            value={handleInput}
            className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4 mt-4 appearance-none focus:outline-none focus:border-blue"
          />
          </div>

            <div style={{ textAlign: "center", fontWeight: "bold" }}>
              <h3>Avaliable times</h3>
            </div>
            <ul>
              {filterBySpeciality(speciality, schedules).map((schedule) => (
                <li
                className={`mb-3 border-4 border-gray-400 bg-gray-300 rounded p-4 ${clickedSchedule === schedule.id ? 'selected-booking' : ''} ${hoveredSchedule === schedule.id ? 'hovered-booking' : ''}`}
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
                  <strong>Specialist:</strong> {schedule.speciality}
                  <br />
                </li>
              ))}
            </ul>
            <button className="book-btn" onClick={(e) => handleSubmit(e)}>
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default BookingPage;
