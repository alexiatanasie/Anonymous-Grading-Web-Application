import React, { useState } from "react";

function AddProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title.trim() || !description.trim()) {
            setError("Title and Description are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/createproject", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, link }),
            });

            if (response.ok) {
                setSuccess("Project created successfully!");
                setTitle("");
                setDescription("");
                setLink("");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to create project.");
            }
        } catch (error) {
            console.error("Error creating project:", error);
            setError("An error occurred while creating the project.");
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
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://example.com"
                    />
                </div>
                <button type="submit">Create Project</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
}

export default AddProject;