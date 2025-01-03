import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css"; // Importăm fișierul CSS pentru stiluri
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', { email, password, name });
            alert('Registration successful!');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message); // Display backend error message
                alert(error.response.data.message); // Alert user about the duplicate account
            } else {
                setError('Registration failed. Please try again later.');
                alert('Registration failed. Please try again later.');
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Register;
