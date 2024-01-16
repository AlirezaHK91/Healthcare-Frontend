import React, { useEffect, useState } from "react";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { parseISO, format } from "date-fns";
import Modal from "../components/Modal";
import spec from "../assets/spec.png";
import perac from "../assets/perac.png";
import edit from "../assets/edit.png";
import pass from "../assets/pass.png";
import view from "../assets/view.png";
import { margin } from "@mui/system";

const apiUrl = import.meta.env.VITE_API_URL;

const StaffDashboard = () => {
  const [speciality, setSpeciality] = useState("");
  const [user, setUser] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [schedule, setSchedule] = useState({ user: { id: user } });
  const [bookings, setBookings] = useState([]);
  const [isUserDetailsFormExpanded, setIsUserDetailsFormExpanded] =
    useState(true);
  const [isPasswordFormExpanded, setIsPasswordFormExpanded] = useState(false);
  const [isBookingFormExpanded, setIsBookingFormExpanded] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser.id);
    }
    console.log("User: ", storedUser);
  }, []);

  useEffect(() => {
    setSchedule((prevSchedule) => {
      const updateUser = {
        ...prevSchedule,
        user: { id: user },
        isAvailable: true,
      };
      setSchedule(updateUser);
    });
  }, [user]);

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

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };
  console.log("After Schedulestate: ", schedule);

  const buttonStyle = {
    width: "100%",
    textAlign: "center",
    padding: "12px",
    borderRadius: "8px",
    color: "black",
    cursor: "pointer",
    marginTop: "1rem",
  };

  const [updateUser, setUpdate] = useState({
    fullName: "",
    speciality: "",
    username: "",
    email: "",
  });

  const [updatePassword, setUpdatePassword] = useState({
    password: "",
  });

  const toggleFormExpansion = (formType) => {
    if (formType === "userDetails") {
      setIsUserDetailsFormExpanded((prev) => !prev);
      setIsPasswordFormExpanded(false);
      setIsBookingFormExpanded(false);
    } else if (formType === "password") {
      setIsPasswordFormExpanded((prev) => !prev);
      setIsUserDetailsFormExpanded(false);
      setIsBookingFormExpanded(false);
    } else if (formType === "bookingDetails") {
      setIsBookingFormExpanded((prev) => !prev);
      setIsUserDetailsFormExpanded(false);
      setIsPasswordFormExpanded(false);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/auth/user/${user}`, {
          withCredentials: true,
        });
        const userInfo = response.data;
        setUpdate(userInfo);
        console.log("Stored user", userInfo);
      } catch (error) {
        console.error("Error fetching user information:", error.message);
        setErrorMessage("Failed to fetch user information.");
      }
    };

    if (user) {
      getUserInfo();
    }
  }, [user]);

  useEffect(() => {
    setSuccessMessage("");
    setErrorMessage("");
  }, [isUserDetailsFormExpanded, isPasswordFormExpanded]);

  const onInputChange = (e, formType) => {
    if (formType === "userDetails") {
      setUpdate({ ...updateUser, [e.target.name]: e.target.value });
    } else if (formType === "password") {
      setUpdatePassword({ ...updatePassword, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/auth/booking/getAll`, {
          withCredentials: true,
        });
        const bookingData = response.data;

        setBookings(bookingData);
        console.log("Bookings:", bookingData);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
        setErrorMessage("Failed to fetch booking details.");
      }
    };

    if (user && isBookingFormExpanded) {
      getBookings();
    }
  }, [user, isBookingFormExpanded]);

  const onSubmit = async (e, formType) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let res;
      if (formType === "userDetails") {
        res = await axios.put(
          `${apiUrl}/api/auth/update-user/${user}`,
          updateUser,
          { withCredentials: true }
        );
      } else if (formType === "password") {
        res = await axios.put(
          `${apiUrl}/api/auth/update-password/${user}?newPassword=${updatePassword.password}`,
          { withCredentials: true }
        );
      }

      console.log(res);
      setSuccessMessage(
        formType === "userDetails"
          ? "User information updated successfully!"
          : "Password updated successfully!"
      );
      setErrorMessage("");
    } catch (error) {
      console.error("Error from react:", error.message);
      setErrorMessage(
        formType === "userDetails"
          ? "User information updateUser failed. Please try again."
          : "Password update failed. Please try again."
      );
      setSuccessMessage("");
    }
  };

  const setDoneBooking = async (booking) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/auth/booking/setIsDone/${
          booking.id
        }?isDone=${!booking.isDone}`,
        {},
        {
          withCredentials: true,
        }
      );

      const updatedBooking = response.data;

      const index = bookings.findIndex((b) => b.id === updatedBooking.id);
      if (index !== -1) {
        setBookings((prevBookings) => [
          ...prevBookings.slice(0, index),
          updatedBooking,
          ...prevBookings.slice(index + 1),
        ]);
      }
    } catch (error) {
      console.error("Failed to set booking to done.", error.message);
      setErrorMessage("Failed to set booking to done.");
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/auth/booking/delete/${bookingId}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error("Error canceling booking:", error.message);
      setErrorMessage("Failed to cancel booking.");
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
      {/* update user */}
      <div
        className="form-toggle mb-4 w-96 mx-auto flex items-center justify-center lg:px-8"
        onClick={() => toggleFormExpansion("userDetails")}
        style={{
          cursor: "pointer",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          marginBottom: "10px",
          backgroundColor: isUserDetailsFormExpanded ? "#A3B8CB" : "#506081",
          color: isUserDetailsFormExpanded ? "#000" : "white",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ flex: "", marginLeft: "10px" }}>
          Update user information
        </span>
        <img className="w-8" src={edit} alt="" />
      </div>
      <form
        style={{ display: isUserDetailsFormExpanded ? "block" : "none" }}
        onSubmit={(e) => onSubmit(e, "userDetails")}
      >
        <div className="container mb-7 max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
          <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
            <h1 className="mb-5 text-xl text-center">User information</h1>
            <h6>Fullname</h6>
            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="fullname"
              placeholder={updateUser.fullName || "Fullname"}
              value={updateUser.firstName}
              onChange={(e) => onInputChange(e, "userDetails")}
            />
            <h6>Username</h6>
            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="username"
              placeholder={updateUser.username || "Username"}
              value={updateUser.username}
              onChange={(e) => onInputChange(e, "userDetails")}
            />
            <h6>Email</h6>
            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="email"
              placeholder={updateUser.email || "Email"}
              value={updateUser.email}
              onChange={(e) => onInputChange(e, "userDetails")}
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded-lg bg-[#82a9ab] text-black hover:bg-green-dark focus:outline-none my-1"
              style={buttonStyle}
            >
              Update
            </button>
            {errorMessage && (
              <p className="text-red-500 text-lg">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-700 text-md">{successMessage}</p>
            )}
          </div>
        </div>
      </form>

      {/* change password */}
      <div
        className="form-toggle mb-4 w-96 mx-auto flex items-center justify-center lg:px-8"
        onClick={() => toggleFormExpansion("password")}
        style={{
          cursor: "pointer",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          marginBottom: "10px",
          backgroundColor: isPasswordFormExpanded ? "#A3B8CB" : "#506081",
          color: isPasswordFormExpanded ? "#000" : "white",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ flex: "" }}>Update Password</span>
        <img className="w-8 ml-2" src={pass} alt="" />
      </div>
      <form
        style={{ display: isPasswordFormExpanded ? "block" : "none" }}
        onSubmit={(e) => onSubmit(e, "password")}
      >
        <div className="container mb-7 max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
          <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
            <h1 className="mb-5 text-xl text-center">Password</h1>

            <input
              type="password"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="password"
              placeholder="New password"
              value={updatePassword.password}
              onChange={(e) => onInputChange(e, "password")}
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded-lg bg-[#82a9ab] text-black hover:bg-green-dark focus:outline-none my-1"
              style={buttonStyle}
            >
              Update
            </button>
            {errorMessage && (
              <p className="text-red-500 text-lg">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-700 text-md">{successMessage}</p>
            )}
          </div>
        </div>
      </form>

      {/* List Booking Details */}
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
      {isBookingFormExpanded && (
        <div className="container mb-32 max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
          <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
            <h1 className="mb-5 text-xl text-center">Upcoming appointments</h1>
            <div className="booking-list text-sm">
              <ul>
                {bookings.map((booking) => (
                  <li
                    className="mb-1 border-2 border-gray-400 bg-gray-300 rounded p-2 text-xs "
                    key={booking.id}
                  >
                    <strong>Specialist:</strong> {booking.speciality}
                    <img className="inline-block w-7 mb-2" src={perac} alt="" />
                    <br />
                    <strong>Date:</strong> {booking.schedule.date}
                    <br />
                    <strong>Time:</strong> {booking.schedule.time}
                    <br />
                    <button
                      className="mt-2 p-1 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                    <button
                      className={`mt-2 float-right ml-6 p-1 rounded ${
                        booking.isDone ? "bg-red-500" : "bg-green-500"
                      } text-white`}
                      onClick={() => setDoneBooking(booking)}
                    >
                      {!booking.isDone ? "In progress" : "Done"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffDashboard;
