import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Resetează eroarea
        setSuccessMessage(''); // Resetează mesajul de succes

        try {
            const response = await axios.post('http://localhost:8000/register', { email, password, name });
            setSuccessMessage(response.data.message); // Mesaj de succes
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message); // Mesajul din backend (utilizator existent)
            } else {
                setError('Registration failed. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
    );
}

export default Register;