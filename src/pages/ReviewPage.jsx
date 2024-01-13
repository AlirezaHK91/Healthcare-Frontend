import { FaStar } from "react-icons/fa";
import feedback from "../assets/feed.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ReviewPage() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [user, setUserId] = useState(""); // State for the user ID
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserId(storedUser.id);
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/auth/booking/getAll/${user}`,
          {
            withCredentials: true,
          }
        );
        const bookingData = response.data;

        const filteredBookings = bookingData.filter(
          (booking) => booking.isDone && !booking.review
        );
        setBookings(filteredBookings);
        console.log("Filtered Bookings:", filteredBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleSubmit = async () => {
    if (rating === null || comment.trim() === "" || selectedBooking === null) {
      setErrorMessage("Please provide a rating, comment");
      return;
    }

    const payload = {
      user: { id: user },
      rating: rating,
      comment: comment,
      booking: { id: selectedBooking.id },
    };

    try {
      const response = await axios.post(`${apiUrl}/api/auth/review`, payload, {
        withCredentials: true,
      });
      setSuccessMessage("Review submitted successfully");
      setErrorMessage("");
      setModalMessage("Thanks for your feedback");
      setIsModalOpen(true)
      console.log("Review submitted successfully:", response.data);
    } catch (error) {
      setErrorMessage("Error submitting review. Please try again later.");
      console.error("Error submitting review:", error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col">
      <div className="mx-auto mt-5 mb-3">
        <img src={feedback} className="w-80 mt-20" alt="Success Icon" />
      </div>

      {/* Select booking */}
      <div className="mx-auto mt-5 mb-3">
        <select
          value={selectedBooking ? selectedBooking.id : ""}
          onChange={(e) => {
            const selectedId = e.target.value;

            const selected = bookings.find(
              (booking) => booking.id.toString() === selectedId
            );

            setSelectedBooking(selected || null);
          }}
          className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4 focus:outline-none focus:border-blue">
          <option value="" disabled>
            Select a booking
          </option>
          {bookings.map((booking) => (
            <option key={booking.id} value={booking.id}>
              Date: {booking.schedule.date} -- Time: {booking.schedule.time}
            </option>
          ))}
        </select>
      </div>

      <div className="mx-auto mb-3 flex">
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
                  currentRating <= (hover || rating) ? "#ffc107" : "#98C2DA"
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
          className="block border-2 border-[#575757] w-80 p-1 rounded-lg mb-4  focus:outline-none focus:border-blue"
        />
      </div>

      <div className="mx-auto mb-3 ">
        {/* submit */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full text-center py-3 px-16 border-2 rounded-lg bg-[#82a9ab] text-black hover:bg-green-dark focus:outline-none my-1">
          Submit review
        </button>
        {errorMessage && <p className="text-red-500 text-md">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-700 text-md">{successMessage}</p>
        )}
        <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        successMessage={modalMessage}
      />
      </div>
    </div>
  );
}
