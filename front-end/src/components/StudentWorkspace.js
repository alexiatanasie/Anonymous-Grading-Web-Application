import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProject from "./AddProject";
import ProjectList from "./ProjectList";
import "./StudentWorkspace.css";

function StudentWorkspace() {
    const [team, setTeam] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/teams/student", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setTeam(response.data);
            } catch (err) {
                console.error("Error fetching team:", err);
                setError(err.response?.data?.message || "Failed to fetch team.");
            }
        };

        fetchTeam();
    }, []);

    return (
        <div className="student-workspace-container">
            <h1>Student Workspace</h1>

            <div className="team-section">
                <h2>My Teams</h2>
                {error && <p className="error-message">{error}</p>}
                {team ? (
                    <div>
                        <h3>Team Name: {team.TeamName}</h3>
                        <h4>Members:</h4>
                        <ul className="team-members-list">
                            {team.Students.map((student) => (
                                <li key={student.StudentId}>{student.User.Username}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    !error && <p>You are not part of any team.</p>
                )}
            </div>

            <hr />

            <div className="project-section">
                <AddProject />
                <ProjectList />
            </div>
        </div>
    );
}

export default StudentWorkspace;
