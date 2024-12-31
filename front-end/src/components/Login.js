import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const userData = await response.json(); // Get user data from response
                alert("Login successful!");

                // Store user data (e.g., role) in localStorage
                localStorage.setItem("userType", userData.userType);
                localStorage.setItem("username", userData.username);

                // Navigate to appropriate workspace based on userType
                if (userData.userType === "student") {
                    navigate("/student-workspace");
                } else if (userData.userType === "professor") {
                    navigate("/professor-workspace");
                } else {
                    alert("Invalid user type.");
                }
            } else {
                alert("Login failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred during login.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
