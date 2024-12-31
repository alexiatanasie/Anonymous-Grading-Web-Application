import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/student-workspace">Student Workspace</Link></li>
                <li><Link to="/professor-workspace">Professor Workspace</Link></li>
                <li><Link to="/jury-projects">Jury</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;