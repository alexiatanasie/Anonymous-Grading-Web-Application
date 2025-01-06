import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function JuryAssignedProjects() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAssignedProjects = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/jury-projects", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch jury projects.");
                }
                const data = await response.json();
                setProjects(data.projects);
            } catch (error) {
                console.error("Error:", error);
                setError(error.message);
            }
        };

        fetchAssignedProjects();
    }, []);

    return (
        <div>
            <h2>Jury Assigned Projects</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        {project.title} - Team: {project.teamName} -{" "}
                        <Link to={`/grade/${project.id}`}>Grade</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JuryAssignedProjects;
