import { FaStar } from "react-icons/fa";
import successfull from "../assets/successfull.png";
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ReviewPage() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [user, setUserId] = useState(""); // State for the user ID

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserId(storedUser.id);
    }
  }, []);

  const handleSubmit = async () => {
    if (rating === null || comment.trim() === "") {
      alert("Please provide a rating, comment");
      return;
    }

    const payload = {
      user: { id: user },
      rating: rating,
      comment: comment,
    };

    try {
      const response = await axios.post(`${apiUrl}/api/auth/review`, payload, {
        withCredentials: true,
      });

      console.log("Review submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting review:", error.message);
      alert("Error submitting review. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mx-auto mt-5 mb-3">
        <img src={successfull} className="w-40" alt="Success Icon" />
      </div>
      <div className="mx-auto mt-5 mb-3 flex">
        {/* review */}
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={currentRating}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onChange={() => setRating(currentRating)}
                required
              />
              <FaStar
                className="star"
                size={30}
                color={
                  currentRating <= (hover || rating) ? "ffc107" : "#e4e5e9"
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <div className="mx-auto mt-5 mb-3 ">
        {/* comments of review */}
        <textarea
          placeholder="Leave feedback comment"
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4  focus:outline-none focus:border-blue"
        />
      </div>

      <div className="mx-auto mt-5 mb-3 ">
        {/* submit */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#575757] text-black hover:bg-green-dark focus:outline-none my-1">
          Submit review
        </button>
      </div>
    </div>
  );
}
