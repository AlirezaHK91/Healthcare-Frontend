import { FaStar } from "react-icons/fa";
import successfull from "../assets/successfull.png";
import { useState } from "react";

export default function ReviewPage() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex flex-col">
      <div className="mx-auto mt-5 mb-3">
        <img src={successfull} className="w-40" />
      </div>
      <div className="mx-auto mt-5 mb-3 flex ">
        {/* review */}
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label>
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
          className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4  focus:outline-none focus:border-blue"
        />
      </div>
      <div className="mx-auto mt-5 mb-3 ">
        {/* submit */}
        <button
          type="submit"
          className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#575757] text-black hover:bg-green-dark focus:outline-none my-1">
          Submit review
        </button>
      </div>
    </div>
  );
}
