import React, { useEffect, useState } from "react";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { parseISO, format } from "date-fns";
import Modal from "../components/Modal";
import spec from "../assets/spec.png";
import prac from "../assets/perac.png";
import { margin } from "@mui/system";

const apiUrl = import.meta.env.VITE_API_URL;

const StaffDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [speciality, setSpeciality] = useState("");
  const [combinedDateTime, setCombinedDateTime] = useState(null);
  const [user, setUser] = useState(0);
  const [clickedSchedule, setClickedSchedule] = useState(null);
  const [hoveredSchedule, setHoveredSchedule] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [schedule, setSchedule] = useState({user: {id: user}});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser.id);
    }
    console.log("User: ", storedUser);
  }, []);

  useEffect(() => {
    setSchedule((prevSchedule) => {
      const updateUser = {...prevSchedule, user: {id: user}, isAvailable: true}
      setSchedule(updateUser);
    })
  }, [user])

  const updateSchedule = (e) => {
    console.log("Before Schedulestate: ", schedule);
    if (e.target.name == "date") {
      const updateDate = { ...schedule, date: e.target.value };
      setSchedule(updateDate);
    } else if (e.target.name == "time") {
      const updateTime = { ...schedule, time: e.target.value };
      setSchedule(updateTime);
    } else if (e.target.name == "speciality") {
      const updateSpeciality = { ...schedule, speciality: e.target.value };
      setSchedule(updateSpeciality);
    }
  };
  // useEffect(() => {
  //   console.log("Fetching schedules...");
  //   const getSchedules = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${apiUrl}/api/auth/schedule/get-all`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       const scheduleData = response.data;
  //       const scheduleAvailable = scheduleData.filter(
  //         (schedule) => schedule.isAvailable
  //       );
  //       setSchedules(scheduleAvailable);
  //     } catch (error) {
  //       console.error("Error fetching scedules:", error.message);
  //     }
  //   };
  //   getSchedules();
  // }, []);

  // useEffect(() => {
  //   updateSchedule();
  // },[selectedDate][selectedDate])

  const handleDateChange = (e) => {
    console.log("event date: ", e);
    // setSchedule((prevSchedule) => {
    //   const updatedSchedule = { ...prevSchedule };

    //   updatedSchedule[date] = date

    // }
    // );
    // handleTimeChange(date);
    updateSchedule(e);
  };

  const handleTimeChange = (time) => {
    console.log("Time picked: ", time);
    // const formattedTime = formatTimeToHHMMSS(time);
    setSelectedTime(time);
    updateSchedule();
  };

  // function formatTimeToHHMMSS(timeString) {
  //   const dateTime = parseISO(timeString);
  //   const formattedTime = format(dateTime, "HH:mm:ss");
  //   return formattedTime;
  // }

  // const combineDateTime = (date, time) => {
  //   if (date && time) {
  //     const combinedDateTime = new Date(
  //       date.getFullYear(),
  //       date.getMonth(),
  //       date.getDate(),
  //       time.getHours(),
  //       time.getMinutes()
  //     );
  //     setCombinedDateTime(combinedDateTime);
  //   }
  // };



  const handleInput = (e) => {
    if (e.target.name === "speciality") {
      setSpeciality(e.target.value);
      updateSchedule();
    }

    console.log(e.target.schedule);
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user !== 0 && speciality !== 0) {
      try {
        await axios.post(`${apiUrl}/api/auth/schedule`, schedule, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setSuccessMessage("Schedule confirmed");
        setErrorMessage("");
        setModalMessage("A confirmation will be sent to your email address.");
        setIsModalOpen(true);
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

  // const filterBySpeciality = (speciality, schedules) => {
  //   if (speciality === "") {
  //     return schedules  || [];
  //   } else {
  //     return (schedules || []).filter(
  //       (schedule) => schedule.speciality === speciality && schedule.isAvailable
  //     );
  //   }
  // };
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };
  console.log("After Schedulestate: ", schedule);
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
          flexDirection: "row",
        }}
      >
        <span style={{ fontSize: "17px" }}>Create schedule</span>
        <img className="w-7 ml-2" src={spec} alt="" />
      </div>
      <div className="container -mt-14">
        <div className="flex-container flex-co flex flex-1">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "85%",
              padding: "20px",
              alignItems: "center",
            }}
          >
            {/* 
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="m-2">
                <DesktopDatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  inputFormat="YYYY-MM-DD"
                />
              </div>
              <div>
                <DesktopTimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  inputFormat="HH:mm:ss"
                />
              </div>
              
              <div>{combinedDateTime && combinedDateTime.toLocaleString()}</div>
            </LocalizationProvider> 
            */}
            <input
              type="date"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              placeholder="Date"
              name="date"
              // value={value}
              onChange={(e) => updateSchedule(e)}
              required
            />
            <input
              type="time"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              placeholder="Time"
              name="time"
              // value={selectedTime}
              onChange={(e) => updateSchedule(e)}
              required
            />

            <form className="form">
              <select
                name="speciality"
                className="block border-2 border-[#575757] mt-6 w-full p-1 rounded-lg mb-4 appearance-none focus:outline-none focus:border-blue"
                // value={speciality}
                onChange={(e) => updateSchedule(e)}
              >
                <option>Select Speciality</option>
                <option value="GENERAL_PRACTITIONER">
                  General Practitioner
                </option>
                <option value="DISTRICT_NURSE">District Nurse</option>
                <option value="PHYSIOTHERAPIST">Physiotherpaist</option>
                <option value="CURATOR">Curator</option>
                <option value="FOOT_THERAPIST">Foot Therapist</option>
                <option value="MIDWIFE">Midwife</option>
                <option value="PSYCHOLOGIST">Psychologist</option>
                <option value="BVC_NURSE">Bvc Nurse</option>
              </select>
              {schedules.length === 0 ? (
                <p className="text-center text-lg mb-2">
                  No available times to book.
                </p>
              ) : (
                <ul>
                  <p className="text-center text-lg mb-2">Available times</p>
                  {/* {filterBySpeciality(speciality, schedules).map((schedule) => (
                    <li
                      className={`list mb-3 border-2 border-gray-400 bg-gray-300 rounded p-2 ${
                        clickedSchedule === schedule.id
                          ? "selected-booking"
                          : ""
                      } ${
                        hoveredSchedule === schedule.id ? "hovered-booking" : ""
                      }`}
                      key={schedule.id}
                      onClick={() => {
                        setScheduleId(
                          clickedSchedule === schedule.id ? 0 : schedule.id
                        );
                        setClickedSchedule(
                          clickedSchedule === schedule.id ? null : schedule.id
                        );
                      }}
                      name="scheduleId"
                      value={schedule.id}
                      style={{ fontSize: "12px" }}
                    >
                      <strong>Specialist:</strong> {schedule.speciality}{" "}
                      <img
                        className="inline-block w-6 mb-2"
                        src={prac}
                        alt=""
                      />
                      <br />
                      <strong>Date:</strong> {schedule.date}
                      <br />
                      <strong>Time:</strong> {schedule.time}
                      <br />
                    </li>
                  ))} */}
                </ul>
              )}
              <button
                className="book-btn bg-[#82a9ab]"
                onClick={(e) => handleSubmit(e)}
              >
                Create Schedule
              </button>

              {errorMessage && (
                <p className="text-red-500 mt-4 text-center text-lg">
                  {errorMessage}
                </p>
              )}
              {successMessage && (
                <p className="text-green-700 text-md mt-4 text-center">
                  {successMessage}
                </p>
              )}
            </form>
            
            <Modal
              isOpen={isModalOpen}
              closeModal={closeModal}
              successMessage={modalMessage}
              successMessage1={successMessage}
            />
          </div>
        </div>
        
      </div>
      <div
        className="form-toggle mb-4 w-96 mx-auto flex items-center justify-center lg:px-8"
        onClick={() => toggleFormExpansion("bookingDetails")}
        style={{
          cursor: "pointer",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          marginBottom: "10px",
          backgroundColor: isBookingFormExpanded ? "#A3B8CB" : "#506081",
          color: isBookingFormExpanded ? "#000" : "white",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ flex: "" }}>View Booking Details</span>
        <img className="w-8 ml-2" src={view} alt="" />
      </div>
    </>
  );
};

export default StaffDashboard;
