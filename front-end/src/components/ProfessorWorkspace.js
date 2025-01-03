import React, { useEffect, useState } from "react";

function ProfessorWorkspace() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch("http://localhost:8000/api/professor-projects");
            const data = await response.json();
            setProjects(data);
        };

        fetchProjects();
    }, []);

    return (
        <div>
            <h1>Professor Workspace</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>{project.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProfessorWorkspace;