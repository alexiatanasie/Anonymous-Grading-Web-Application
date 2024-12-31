import React, { useState, useEffect } from "react";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        userType: "student", // Default type
        teamId: "",
    });

    const [teams, setTeams] = useState([]);

    // Fetch teams when the component mounts
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/teams");
                if (response.ok) {
                    const data = await response.json();
                    setTeams(data); // Populate team dropdown
                } else {
                    console.error("Failed to fetch teams.");
                }
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                alert("Registration failed.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
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
            <select name="userType" value={formData.userType} onChange={handleChange} required>
                <option value="student">Student</option>
                <option value="professor">Professor</option>
            </select>
            {formData.userType === "student" && (
                <select name="teamId" value={formData.teamId} onChange={handleChange} required>
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                        <option key={team.TeamId} value={team.TeamId}>
                            {team.name}
                        </option>
                    ))}
                </select>
            )}
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;