import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import patient from "../assets/patient.png"
import staff from "../assets/staff.png"

const apiUrl = import.meta.env.VITE_API_URL;

function RegisterPage() {
  let navigate = useNavigate();

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [register, setRegister] = useState({
    fullName: "",
    speciality: "",
    username: "",
    email: "",
    roles: ["user"], // Set a default role, you can adjust as needed
    password: "",
  });

  const { fullName, speciality, username, email, roles, password } = register;

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "roles") {
      setRegister({ ...register, roles: [value] });
    } else if (name === "speciality") {
      setRegister({ ...register, speciality: value });
    } else {
      setRegister({ ...register, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!fullName || !username || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      let postData = {
        fullName,
        username,
        email,
        roles,
        password,
      };

      // Only include speciality if the role is "Staff"
      if (roles[0] === "admin") {
        postData.speciality = speciality;
      }

      console.log(postData);

      await axios.post(`${apiUrl}/api/auth/signup`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        navigate("/loginpage");
      }, 3000);
    } catch (error) {
      console.error("Error from react:", error.message);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="pt-28 h-full p-4 lg:pt-25 ">
        <div className="container max-w-lg flex-1 mx-auto flex flex-col items-center justify-center lg:px-4 ">
          <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full  ">
            <h1 className="text-3xl text-center mb-3">Sign up</h1> 
            {roles[0] === "user" ? (
              <img className="w-15 ml-44 sm:ml-32" src={patient} alt="" />
            ) : (
              <img className="w-15 ml-44 sm:ml-32" src={staff} alt="" />
            )}

            <select
              name="roles"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4  focus:outline-none focus:border-blue"
              value={roles}
              onChange={(e) => onInputChange(e)}>
              <option value="user">Patient</option>
              <option value="admin">Staff</option>
            </select>
            {roles[0] === "admin" && (
              <select
                name="speciality"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4 appearance-none focus:outline-none focus:border-blue"
                value={speciality}
                onChange={(e) => onInputChange(e)}>
                <option value="" disabled>
                  Select Speciality
                </option>
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
            )}
            <input
              type="text"
              name="fullName"
              placeholder="Fullname"
              className="inline-block border-2 border-[#575757] w-48 p-1 rounded-lg mb-4 mr-10 lg:w-full"
              value={fullName}
              onChange={(e) => onInputChange(e)}
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              className="inline-block border-2 border-[#575757] w-48 p-1 rounded-lg mb-4 mr-10 lg:w-full"
              value={username}
              onChange={(e) => onInputChange(e)}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="inline-block border-2 border-[#575757] w-48 p-1 rounded-lg mb-4 mr-10 lg:w-full"
              value={email}
              onChange={(e) => onInputChange(e)}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="inline-block border-2 border-[#575757] w-48 p-1 rounded-lg mb-4 mr-10 lg:w-full"
              value={password}
              onChange={(e) => onInputChange(e)}
            />

            <div className="text-[#434343] inset-x-16">
              Already have an account?
              <a
                className="no-underline border-b border-blue text-blue"
                href="loginpage">
                Sign in
              </a>
              .
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#82a9ab] text-black hover:bg-green-dark focus:outline-none my-1">
              Sign up
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

export default RegisterPage;
