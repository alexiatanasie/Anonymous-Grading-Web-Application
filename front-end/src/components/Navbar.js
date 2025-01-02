import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token"); 

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.removeItem("token"); 
            navigate("/login"); 
        }
    };

    return (
        <nav className="navbar">
            <ul>
                {!isAuthenticated && (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <li><Link to="/student-workspace">Student Workspace</Link></li>
                        <li><Link to="/professor-workspace">Professor Workspace</Link></li>
                        <li><Link to="/jury-projects">Jury</Link></li>
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
