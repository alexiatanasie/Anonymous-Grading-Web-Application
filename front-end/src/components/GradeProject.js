import React, { useState } from "react";

function GradeProject({ projectId }) {
    const [grade, setGrade] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/grade/${projectId}`, { // Use backticks here
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ grade }),
            });

            if (response.ok) {
                alert("Grade submitted successfully!");
            } else {
                alert("Failed to submit grade.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2>Grade Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Grade (1-10):
                    <input
                        type="number"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        min="1"
                        max="10"
                        step="0.1"
                        required
                    />
                </label>
                <button type="submit">Submit Grade</button>
            </form>
        </div>
    );
}

export default GradeProject;
