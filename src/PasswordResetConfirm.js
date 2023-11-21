import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PasswordResetConfirm({ onPasswordReset }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { uid, token } = useParams();
    const navigate = useNavigate();

    const handlePasswordReset = async (newPassword, uid, token) => {
        // Get uid and token from URL
        const response = await fetch(`http://localhost:8000/api/password-reset-confirm/${uid}/${token}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPassword }),
        });
      
        console.log("Response from password reset:", response);
        return response;
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await handlePasswordReset(newPassword, uid, token);
            if (response.ok) {
                setMessage('Password reset successful. You will be redirected to login.');
                setTimeout(() => navigate('/'), 3000);
            } else {
                const responseData = await response.json();
                setMessage(responseData.message || 'Password reset failed. Please try again.');
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            setMessage('An error occurred. Please try again.');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                required
            />
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
            />
            <button type="submit">Reset Password</button>
            {message && <p>{message}</p>}
        </form>
    );
}


export default PasswordResetConfirm;