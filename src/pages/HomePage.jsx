import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lambo from'../assets/care.png';

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const getRandomAuctions = (arr, count) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const buttonStyle = {
    border: "1px solid transparent",
    fontSize: "medium",
    borderRadius: "8px",
    padding: "10px 20px",
    transition: "background-color 0.3s ease-in-out",
  };

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
          <img src={Lambo} alt="Car Placeholder" style={{ maxWidth: "70%" }} />
          <Link
            to={`/booking`}
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
