import React, { useState } from "react";

function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validăm input-ul
        if (!username || !newPassword) {
            setErrorMessage("Username and new password are required.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, newPassword }),
            });

            if (response.ok) {
                setConfirmationMessage("Password reset successfully. You can now login.");
                setErrorMessage(""); // Resetăm erorile
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Failed to reset password.");
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    New Password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Reset Password</button>
            </form>
            {confirmationMessage && <p style={{ color: "green" }}>{confirmationMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
}

export default ForgotPassword;
