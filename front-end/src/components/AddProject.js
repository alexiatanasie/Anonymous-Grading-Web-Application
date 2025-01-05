import React, { useState, useEffect } from "react";

function AddProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [teamName, setTeamName] = useState("");
    const [link, setLink] = useState("");
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch all team names on component mount
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/teams");
                const data = await response.json();
                setTeams(data); // Expecting an array of team objects
            } catch (error) {
                console.error("Error fetching teams:", error);
                setError("Failed to fetch teams.");
            }
        };

        fetchTeams();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title.trim() || !description.trim() || !teamName.trim()) {
            setError("All fields (Title, Description, and Team Name) are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/createproject", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, teamName, link }),
            });

            if (response.ok) {
                setSuccess("Project created successfully!");
                setTitle("");
                setDescription("");
                setTeamName("");
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
                    <label>
                        Select Team:
                        <select
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            required
                        >
                            <option value="">-- Select Team --</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.name}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </label>
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
