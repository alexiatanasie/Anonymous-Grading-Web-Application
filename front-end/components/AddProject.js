import React, { useState } from "react";

function AddProject() {
    const [projectName, setProjectName] = useState("");

    const handleAddProject = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: projectName }),
            });

            if (response.ok) {
                alert("Project added successfully!");
                setProjectName("");
            } else {
                alert("Failed to add project.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2>Add Project</h2>
            <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project Name"
            />
            <button onClick={handleAddProject}>Add Project</button>
        </div>
    );
}

export default AddProject;