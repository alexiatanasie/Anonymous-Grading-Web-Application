import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateTeam.css';

function CreateTeam() {
    const [teamName, setTeamName] = useState('');
    const [availableStudents, setAvailableStudents] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch available students on mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/students/available');
                setAvailableStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
                setError('Failed to fetch available students. Please try again later.');
            }
        };

        fetchStudents();
    }, []);

    // Handle team name change
    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    // Handle member selection
    const handleMemberSelection = (e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedMembers(selected);
    };

    // Handle team creation
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!teamName.trim()) {
            setError('Team name is required');
            return;
        }

        if (selectedMembers.length === 0) {
            setError('Please select at least one team member');
            return;
        }

        try {
            await axios.post('http://localhost:8000/teams', {
                name: teamName,
                members: selectedMembers,
            });

            setSuccess('Team created successfully!');
            setTeamName('');
            setSelectedMembers([]);
        } catch (error) {
            console.error('Error creating team:', error);
            setError(
                error.response?.data?.message || 'Failed to create team. Please try again later.'
            );
        }
    };

    return (
        <div className="create-team-container">
            <h2>Create Your Team</h2>
            <form onSubmit={handleSubmit} className="create-team-form">
                <label>
                    Team Name:
                    <input
                        type="text"
                        value={teamName}
                        onChange
                        ={handleTeamNameChange}
                        placeholder="Enter team name"
                        required
                    />
                </label>
                <br />
                <label>
                    Select Team Members:
                    <select
                        multiple
                        value={selectedMembers}
                        onChange={handleMemberSelection}
                        required
                    >
                        {availableStudents.map((student) => (
                            <option key={student.StudentId} value={student.StudentId}>
                                {student.User?.Username || `Student #${student.StudentId}`}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <button type="submit">Create Team</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
}

export default CreateTeam;
