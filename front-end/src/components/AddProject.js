import React, { useState } from "react";

function AddProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [teamId, setTeamId] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !teamId.trim()) {
            alert("All fields (Title, Description, and Team ID) are required.");
            return;
        }

        const projectData = {
            title,
            description,
            teamId,
            link: link.trim() || null, 
        };

        try {
            const response = await fetch("http://localhost:8000/api/createproject", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                alert("Project created successfully!");
                setTitle("");
                setDescription("");
                setTeamId("");
                setLink("");
            } else {
                const errorData = await response.json();
                alert(`Failed to create project: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error creating project:", error);
            alert("An error occurred while creating the project.");
        }
    };

    return (
        <div>
            <h2>Create Project</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Project Title"
                        required
                    />
                </div>
                <div>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Project Description"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={teamId}
                        onChange={(e) => setTeamId(e.target.value)}
                        placeholder="Team ID"
                        required
                    />
                </div>
                <div>
                    <label>
                        Link:
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://example.com"
                        />
                    </label>
                </div>
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
}

export default AddProject;