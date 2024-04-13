import React, { useEffect } from "react";
import { useAuth } from "./../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const navigate = useNavigate();
  const { logout, isAuth } = useAuth();

  useEffect(() => {
    logout();
    navigate("/")
  }, [logout]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h2 style={{ fontSize: "2rem" }}>
        
      </h2>
    </div>
  );
}

export default LogoutPage;
