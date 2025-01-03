import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("userType");
            localStorage.removeItem("username");
            navigate("/login");
        }
    };

    return (
        <nav className="navbar">
            <ul>
                {!token && (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}
                {token && (
                    <>
                        {userType === "student" && (
                            <>
                                <li><Link to="/student-workspace">Student Workspace</Link></li>
                                <li><Link to="/jury-projects">Jury Workspace</Link></li>
                            </>
                        )}
                        {userType === "professor" && (
                            <li><Link to="/professor-workspace">Professor Workspace</Link></li>
                        )}
                        <li>
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
