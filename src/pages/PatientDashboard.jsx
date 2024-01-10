import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function PatienDashboard() {
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [roles, setRoles] = useState("");
  const [isUserDetailsFormExpanded, setIsUserDetailsFormExpanded] = useState(true);
  const [isPasswordFormExpanded, setIsPasswordFormExpanded] = useState(false);

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
    } else if (formType === "password") {
      setIsPasswordFormExpanded((prev) => !prev);
      setIsUserDetailsFormExpanded(false);
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
      } catch (error) {
        console.error("Error from react:", error.message);
        setError(formType === "userDetails" ? "User information updateUser failed. Please try again." : "Password update failed. Please try again.");
      }
    };

  return (
    <>
    {/* update user */}
      <div
        className="form-toggle"
        onClick={() => toggleFormExpansion("userDetails")}
        style={{
          cursor: "pointer",
          padding: "12px",
          margin: "20px 30px 10px 30px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          marginBottom: "10px",
          backgroundColor: isUserDetailsFormExpanded ? "#A3B8CB" : "#506081",
          color: isUserDetailsFormExpanded ? "#000" : "white",
          textAlign: "center",
        }}
      >
        Update user details
      </div>
      <form
        style={{ display: isUserDetailsFormExpanded ? "block" : "none", }}
        onSubmit={(e) => onSubmit(e, "userDetails")}
      >
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
          <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
            <h1 className="mb-5 text-xl text-center">User details</h1>

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="fullname"
              placeholder={updateUser.fullName || "Fullname"}
              value={updateUser.firstName}
              onChange={(e) => onInputChange(e, "userDetails")}
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="username"
              placeholder={updateUser.username || "Username"}
              value={updateUser.username}
              onChange={(e) => onInputChange(e, "userDetails")}
            />

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
              className="w-full text-center py-3 rounded-lg bg-[#777777] text-black hover:bg-green-dark focus:outline-none my-1"
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
        className="form-toggle"
        onClick={() => toggleFormExpansion("password")}
        style={{
          cursor: "pointer",
          padding: "12px",
          margin: "20px 30px 10px 30px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          marginBottom: "10px",
          backgroundColor: isPasswordFormExpanded ? "#A3B8CB" : "#506081",
          color: isPasswordFormExpanded ? "#000" : "white",
          textAlign: "center",
        }}
      >
        Update Password
      </div>
      <form
        style={{  display: isPasswordFormExpanded ? "block" : "none", }}
        onSubmit={(e) => onSubmit(e, "password")}
      >
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
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
              className="w-full text-center py-3 rounded-lg bg-[#777777] text-black hover:bg-green-dark focus:outline-none my-1"
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
    </>
  );
}
export default PatienDashboard;
