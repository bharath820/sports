import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    profilePic: ''
  });

  useEffect(() => {
    // Fetch user data from localStorage or API
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      setEditedUser(userData); // Initialize edited user data with current user data
    }
  }, []);

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfileUpdate = () => {
    // Save the updated data in localStorage (or make an API call to update on the server)
    localStorage.setItem("user", JSON.stringify(editedUser));
    setUser(editedUser); // Update user state with edited values
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = '/login';
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>{user.name}'s Profile</h1>
      <img src={user.profilePic} alt="Profile" />
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={editedUser.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={editedUser.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Bio:</label>
        <textarea
          name="bio"
          value={editedUser.bio}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={editedUser.phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Profile Picture (URL):</label>
        <input
          type="text"
          name="profilePic"
          value={editedUser.profilePic}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={handleProfileUpdate}>Save Changes</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
