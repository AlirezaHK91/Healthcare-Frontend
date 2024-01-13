import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import loginimg from "../assets/loginimg.png"
const apiUrl = import.meta.env.VITE_API_URL;


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!username || !password) {
      setError("Fill in your username and password!");
      return;
    }
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/auth/signin`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));
      const userId = data.id;
      console.log("User logged in with ID:", userId);
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.log("Error from react:", error.message);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="pt-28 h-full lg:pt-25 ">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
          <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
            <h1 className="mb-3 text-3xl text-center">Sign in</h1> <img className="w-16 mb-4 ml-36" src={loginimg} alt="" />
            <input
              type="text"
              name="username"
              className="inline-block border-2 border-[#575757] w-48 p-1 rounded-lg mb-4 mr-10 lg:w-full"
              placeholder="Username *"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name=""
              className="inline-block border-2 border-[#575757] w-48 p-1 rounded-lg mb-4 mr-10 lg:w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-[#434343] inset-x-16">
              Don't have an account?
              <a
                className="no-underline border-b border-blue text-blue"
                href="register">
                Sign up
              </a>
              .
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#82a9ab] text-black hover:bg-green-dark focus:outline-none my-1">
              Sign in
            </button>
            {error && <p className="text-red-500 text-lg">{error}</p>}
            {successMessage && (
              <p className="text-green-700 text-md">{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
