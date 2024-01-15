import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import med from'../assets/care.png';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!storedUser);
  }, []);

  return (
    <>
      <p
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Healthcare AB
      </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "40vh",
            marginTop: "50px",
          }}
        >
          <img src={med} alt="Car Placeholder" style={{ maxWidth: "70%" }} />
          <Link to={isLoggedIn ? "/booking" : "/loginpage"}
              style={{ textDecoration: "none", marginTop: "10px", display: "block" }}
          >
              <button
                  className="button1 bg-[#82a9ab]"
                  style={{
                  fontSize: "16px",
                  borderRadius: "8px",
                  padding: "13px 25px 13px 25px",
                  cursor: "pointer",
                  marginTop: "50%",
                }}
              >
          Book appointment
            </button>
        </Link>
        </div>
    </>
  );
};

export default HomePage;
