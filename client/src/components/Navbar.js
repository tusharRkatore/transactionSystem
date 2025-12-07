import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  // ✅ Check login state on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);

    // Listen for login/logout events
    window.addEventListener("authChanged", updateAuthState);

    return () => {
      window.removeEventListener("authChanged", updateAuthState);
    };
  }, []);

  // Function to update login status
  const updateAuthState = () => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");

    // Notify other components like Navbar
    window.dispatchEvent(new Event("authChanged"));

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate("/")}>
        Transaction Dashboard
      </div>

      <div className="nav-links">
        {!loggedIn ? (
          <>
            <Link to="/login" className="nav-btn">
              Login
            </Link>
            <Link to="/register" className="nav-btn">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="nav-btn">
              Dashboard
            </Link>
            <button className="nav-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
