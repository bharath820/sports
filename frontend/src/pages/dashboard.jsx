import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [selectedSport, setSelectedSport] = useState(null);
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sports = ['Cricket', 'Badminton', 'Tennis', 'Basketball', 'Hockey', 'Volleyball'];

  const fetchGrounds = async (sport) => {
    setSelectedSport(sport);
    setLoading(true);
    try {
      const response = await axios.get(`https://sports-vvki.onrender.com/${sport.toLowerCase()}`);
      setGrounds(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch grounds:', error);
      setGrounds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.groundname) {
      fetchGrounds(location.state.groundname);
    }
  }, [location.state]);

  return (
    <div className="container-fluid min-vh-100 bg-body-secondary py-5 px-4">
      <h2 className="mb-4 fw-semibold text-dark">Sports Ground Dashboard</h2>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-4 col-lg-3 mb-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0 text-dark fw-bold">Select a Sport</h5>
            </div>
            <div className="card-body d-grid gap-2">
              {sports.map((sport) => (
                <button
                  key={sport}
                  className={`btn btn-sm rounded-pill ${
                    selectedSport === sport ? 'btn-dark text-white' : 'btn-outline-secondary'
                  }`}
                  onClick={() => fetchGrounds(sport)}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-8 col-lg-9">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="mb-3 fw-semibold text-secondary">
              {selectedSport ? `${selectedSport} Grounds` : 'Select a sport to view grounds'}
            </h5>

            {loading && <div className="text-muted">Loading...</div>}

            {!loading && grounds.length > 0 && (
              <div className="row">
                {grounds.slice(0, 5).map((ground, index) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm rounded-4">
                      {ground.image && (
                        <img
                          src={ground.image}
                          className="card-img-top rounded-top-4"
                          alt={ground.name}
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                      )}
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title fw-bold">{ground.name}</h6>
                        <p className="card-text small text-muted">{ground.text}</p>
                        <button
                          className="btn btn-sm btn-outline-dark mt-auto rounded-pill"
                          onClick={() =>
                            navigate(`/ground/${ground.id}`, {
                              state: {
                                ground,
                                selectedSport: selectedSport, // ✅ Pass selected sport
                              },
                            })
                          }
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && selectedSport && grounds.length === 0 && (
              <div className="text-muted">No grounds available for {selectedSport}.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
