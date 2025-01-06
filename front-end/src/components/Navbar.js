import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    // Starea pentru autentificare și rol
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);

    // Actualizăm starea la montarea componentei
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userTypeFromStorage = localStorage.getItem("userType");

        setIsAuthenticated(!!token); // Verificăm dacă există un token
        setUserType(userTypeFromStorage); // Setăm tipul utilizatorului
    }, []);

    // Funcția pentru logout
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            // Ștergem informațiile de autentificare
            localStorage.removeItem("token");
            localStorage.removeItem("userType");
            localStorage.removeItem("username");

            // Resetăm starea
            setIsAuthenticated(false);
            setUserType(null);

            // Redirecționăm utilizatorul la login
            navigate("/login");
        }
    };

    return (
        <nav className="navbar">
            <ul>
                {/* Linkuri publice: Register și Login */}
                {!isAuthenticated && (
                    <>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}

                {/* Linkuri private pentru utilizatori autentificați */}
                {isAuthenticated && (
                    <>
                        {/* Linkuri pentru studenți */}
                        {userType === "student" && (
                            <>
                                <li><Link to="/student-workspace">Student Workspace</Link></li>
                                <li><Link to="/jury-projects">Jury Workspace</Link></li>
                                <li><Link to="/create-team">Create Team</Link></li>
                            </>
                        )}

                        {/* Linkuri pentru profesori */}
                        {userType === "professor" && (
                            <li><Link to="/professor-workspace">Professor Workspace</Link></li>
                        )}

                        {/* Link pentru Logout */}
                        <li>
                            <Link to="#" onClick={handleLogout}>Logout</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
