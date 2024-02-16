import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import edit from "../assets/edit.png"
import pass from "../assets/pass.png"
import view from "../assets/view.png"
import perac from "../assets/perac.png"

const apiUrl = import.meta.env.VITE_API_URL;

function PatienDashboard() {
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [roles, setRoles] = useState("");
  const [bookings, setBookings] = useState([]);
  const [isUserDetailsFormExpanded, setIsUserDetailsFormExpanded] = useState(false);
  const [isPasswordFormExpanded, setIsPasswordFormExpanded] = useState(false);
  const [isBookingFormExpanded, setIsBookingFormExpanded] = useState(false);

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
      // setIsPasswordFormExpanded(false);
      // setIsBookingFormExpanded(false);
    } else if (formType === "password") {
      setIsPasswordFormExpanded((prev) => !prev);
      // setIsUserDetailsFormExpanded(false);
      // setIsBookingFormExpanded(false);
    }else if (formType === "bookingDetails") {
        setIsBookingFormExpanded((prev) => !prev);
        // setIsUserDetailsFormExpanded(false);
        // setIsPasswordFormExpanded(false);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setRoles(storedUser.roles);
      console.log(storedUser.roles);
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser.id);
    }
  }, []);

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
        setError("Failed to fetch user information.");
      }
    };

    if (user) {
      getUserInfo();
    }
  }, [user]);

  useEffect(() => {
    setSuccessMessage("");
    setError("");
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
        const response = await axios.get(`${apiUrl}/api/auth/booking/getAll/${user}`, {
          withCredentials: true,
        });
        const bookingData = response.data;
        
        const filteredBookings = bookingData.filter((booking) => !booking.isDone);
  
        setBookings(filteredBookings);
        console.log("Bookings:", filteredBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
        setError("Failed to fetch booking details.");
      }
    };
  
    if (user && isBookingFormExpanded) {
      getBookings();
    }
  }, [user, isBookingFormExpanded]);

  const onSubmit = async (e, formType) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
        let res;
        if (formType === "userDetails") {
          res = await axios.put(`${apiUrl}/api/auth/update-user/${user}`, updateUser, { withCredentials: true });
        } else if (formType === "password") {
          res = await axios.put(`${apiUrl}/api/auth/update-password/${user}?newPassword=${updatePassword.password}`, { withCredentials: true });
        }
    
        console.log(res);
        setSuccessMessage(formType === "userDetails" ? "User information updated successfully!" : "Password updated successfully!");
        setError("");
      } catch (error) {
        console.error("Error from react:", error.message);
        setError(formType === "userDetails" ? "User information updateUser failed. Please try again." : "Password update failed. Please try again.");
        setSuccessMessage("");
      }
    };

    const cancelBooking = async (bookingId) => {
        try {
          const response = await axios.delete(`${apiUrl}/api/auth/booking/delete/${bookingId}`, {
            withCredentials: true,
          });
    
          console.log(response.data);
    
          setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
        } catch (error) {
          console.error("Error canceling booking:", error.message);
          setError("Failed to cancel booking.");
        }
      };

  return (
    <>
    {/* update user */}
    <div
  className="form-toggle mb-4 mt-12 w-96 mx-auto flex items-center justify-center lg:px-8"
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
  <span style={{ flex: "", marginLeft:"10px" }}>
    Update user information
  </span>
  <img className="w-8" src={edit} alt="" />
</div>
      <form
        style={{ display: isUserDetailsFormExpanded ? "block" : "none", }}
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
            {error && <p className="text-red-500 text-lg">{error}</p>}
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
  <span style={{ flex: "" }}>
    Update Password
  </span>
  <img className="w-8 ml-2" src={pass} alt="" />
</div>
      <form
        style={{  display: isPasswordFormExpanded ? "block" : "none", }}
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
            {error && <p className="text-red-500 text-lg">{error}</p>}
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
  <span style={{ flex: "" }}>
    View Booking Details
  </span>
  <img className="w-8 ml-2" src={view} alt="" />
</div>
      {isBookingFormExpanded && (
        <div className="container mb-32 max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
        <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
          <h1 className="mb-5 text-xl text-center">Upcoming appointments</h1>
        <div className="booking-list text-sm">
          <ul>
            {bookings.map((booking) => (
              <li className="mb-1 border-2 border-gray-400 bg-gray-300 rounded p-2 text-xs " key={booking.id} >
                 {/* {booking.user.fullName}<br /> */}
                 <strong>Specialist:</strong> {booking.speciality}<img className="inline-block w-7 mb-2" src={perac} alt="" /><br />
                <strong>Date:</strong> {booking.schedule.date}<br />
                <strong>Time:</strong> {booking.schedule.formattedTime}<br />

                <button
              className="mt-2 p-1 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() => cancelBooking(booking.id)}
            >
              Cancel Booking
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
}
export default PatienDashboard;
