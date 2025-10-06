import React from "react";
import { useNavigate } from "react-router-dom";

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Select Login Type</h1>
      <button
        style={{ margin: "10px", padding: "10px 20px" }}
        onClick={() => navigate("/admin-login")}
      >
        Login as Admin
      </button>
      <button
        style={{ margin: "10px", padding: "10px 20px" }}
        onClick={() => navigate("/user-login")}
      >
        Login as User
      </button>
    </div>
  );
};

export default LoginSelection;
