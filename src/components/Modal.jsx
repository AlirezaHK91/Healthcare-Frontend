import React from "react";

function Modal({ isOpen, closeModal, successMessage, successMessage1, errorMessage, userEmail }) {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-75"></div>
          <div className="z-10 bg-white p-4 rounded-md text-center">
            <p className="text-green-900 text-xl mb-4">{successMessage1}</p>
            <p className="text-green-700 text-md mb-4">{successMessage}</p>
            <p className="text-red-700 text-md mb-4">{errorMessage}</p>
            <p className="text-blue-700 text-md mb-4">{userEmail}</p>
            <button
              className="bg-[#8597b8] text-white px-4 py-2 rounded-md"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
