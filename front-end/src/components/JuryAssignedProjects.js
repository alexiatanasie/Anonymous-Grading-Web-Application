import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function JuryAssignedProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchAssignedProjects = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/jury-projects");
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchAssignedProjects();
    }, []);

    return (
        <div>
            <h2>Jury Assigned Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        {project.name} - <Link to={`/grade/${project.id}`}>Grade</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JuryAssignedProjects;
