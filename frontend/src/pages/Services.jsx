import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Grounds() {
  const [grounds, setGrounds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://sports-vvki.onrender.com/grounds")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
        setGrounds(data.data);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  const handleCardClick = (groundname) => {
    const isLoggedIn = localStorage.getItem("userEmail"); // replace with your actual logic

  if (isLoggedIn) {
    navigate("/dashboard", { state: { groundname } });
  } else {
    navigate("/register");
  }
};
  
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Find The Perfect Sports Ground</h2>
      <p className='text-center font-serif'>Explore our selection of top-notch sports grounds available for booking.</p>
      <div className="row">
        {grounds.map((ground, index) => (
          <div
            className="col-md-4 mb-4"
            key={index}
            onClick={() => handleCardClick(ground.name)} // or ground.name if ID is not available
            style={{ cursor: 'pointer' }}
          >
            <div className="card shadow-sm">
              {ground.image && (
                <img
                  src={ground.image}
                  className="card-img-top"
                  alt={ground.name}
                  style={{ height: '200px', objectFit: 'cover'}}
                />
              )}
              <div className="card-body">
                <h5 className="card-title text-center">{ground.name}</h5>
                <p className="card-text text-center">{ground.text}</p>
                <div className="card-footer bg-transparent border-0 text-center">
          <button
            className="btn btn-dark w-75"
            onClick={() => handleCardClick(ground.name)}
          >
            Book Now
          </button>
        </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grounds;
