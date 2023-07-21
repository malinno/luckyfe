import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";


import "./App.css";
import MyTable from "./Table";

const prizes = [
  "Prize 1",
  "Prize 2",
  "Prize 3",
  "Prize 4",
  "Prize 5",
  "Prize 6",
];
const numSegments = prizes.length;

const App = () => {
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to show/hide the modal
  const [showTable, setShowTable] = useState(false);
  const [dataToShow, setDataToShow] = useState([]);
  const fetchDataAndSpin = () => {
    setLoading(true);
    setError(null);
    setIsWheelSpinning(true);
    setSelectedPrize(null);

    axios
      .get("http://localhost:3000/gifts") // Replace this URL with your API endpoint
      .then((response) => {
        setLoading(false);
        // Check if the response data exists and is an array
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Select a random item from the response data
          const randomIndex = Math.floor(Math.random() * response.data.length);
          const randomItem = response.data[randomIndex];

          // Spin the wheel after fetching the data
          const randomDegree = 360 * 5 + Math.floor(Math.random() * 360);
          setTimeout(() => {
            setIsWheelSpinning(false);
            setSelectedPrize(
              prizes[
                Math.floor(
                  (numSegments - (randomDegree % 360)) / (360 / numSegments)
                )
              ]
            );
            setData(randomItem);
            setShowModal(true); // Show the modal after spinning
          }, 3000); // 2000ms is the time it takes to complete one full spin
        } else {
          setLoading(false);
          setError("No data received from the API.");
          setIsWheelSpinning(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        setIsWheelSpinning(false);
      });
  };

  const handleSpinClick = () => {
    if (!isWheelSpinning) {
      fetchDataAndSpin();
    }
  };

  const handleShowWheelClick = () => {
    setSelectedPrize(null);
   
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleShowPrizeClick = () => {
    if (!isWheelSpinning) {
      const selectedPrizeData = data.filter((item) => item.name === selectedPrize);
      setShowTable(true);
      setDataToShow(selectedPrizeData);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    {showTable ? (
      <MyTable data={dataToShow} />
    ) : (
      <div className="max-w-md p-8 bg-white rounded shadow-md">
        <div className="flex flex-col items-center">
          <div
            className={`relative w-64 h-64 border-8 border-indigo-500 rounded-full transition-transform ${
              isWheelSpinning ? "animate-spin" : ""
            }`}
          >
            <div className="absolute w-64 h-64 flex items-center justify-center">
              {isWheelSpinning ? "Spinning..." : "🎉"}
            </div>
            <div
              className={`absolute w-64 h-64 flex items-center justify-center ${
                isWheelSpinning ? "opacity-50" : ""
              }`}
            >
              <div className="w-60 h-60 bg-yellow-500 rounded-full">
                {/* Place your wheel image or design here */}
              </div>
            </div>
          </div>
          <button
            onClick={handleSpinClick}
            disabled={isWheelSpinning}
            className="mt-8 px-4 py-2 text-white bg-indigo-500 rounded shadow-md hover:bg-indigo-600"
          >
            Quay
          </button>
          <div className="mt-4">
            <button
              onClick={handleShowWheelClick}
              className="mr-2 px-4 py-2 text-white bg-green-500 rounded shadow-md hover:bg-green-600"
            >
              Màn Quay
            </button>
            <button
              onClick={handleShowPrizeClick}
              className="px-4 py-2 text-white bg-blue-500 rounded shadow-md hover:bg-blue-600"
            >
              Phần thưởng
            </button>
          </div>
        </div>
      </div>
    )}
      {/* Swal.fire('Any fool can use a computer') */}
      <Modal
  isOpen={showModal}
  onRequestClose={closeModal}
  
  style={{
    overlay: {
      margin:'10%',
      right:"200px",
      // display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Màu nền trắng với độ mờ 0.75
      height: "30%", // Chiều cao của overlay bằng chiều cao của màn hình
      zIndex: 1000, // Đảm bảo modal hiển thị trên các phần tử khác
    },
    content: {
      width: "20%",
      borderRadius: "8px",
      backgroundColor:"rgba(91,165,35,1)",
      alignItems:"center",
      justifyContent:'center',
      textAlign:'center',
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Đổ bóng cho modal
    },
  }}
>
  <h2>Chúc Mừng Bạn</h2>
  {data && data.name ? (
    <p>Đã thắng: {data.name}</p>
  ) : (
    <p>Quay bánh xe để nhận giải thưởng!</p>
  )}
  <button onClick={closeModal} className="bg-red-600 rounded-md w-20 text-sm font-semibold my-7">Đóng</button>
</Modal>


    </div>
  );
};

export default App;
