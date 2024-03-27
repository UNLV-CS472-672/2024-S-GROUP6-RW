import React, { useEffect } from "react";
import { useAuth } from "./../../auth/AuthContext";

function LogoutPage() {
  const { logout, isAuth } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    console.log(`Logout isAuth: ${isAuth}`);
  }, [isAuth]);

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
        You Have Been Successfully Logged Out!
      </h2>
    </div>
  );
}

export default LogoutPage;
