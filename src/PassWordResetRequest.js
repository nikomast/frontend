
import React, { useState } from 'react';
import BackButton from './BackButton';

function PasswordResetRequest({ onPasswordResetRequest }) {
    const [email, setEmail] = useState('');

    const handlePasswordResetRequest = async (email) => {
        try {
            const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/password-reset/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
      
            // Handle the response
            if (response.ok) {
                // Success logic
            } else {
                // Error logic
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
      }; 

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log("Form submitted with email:", email);
        handlePasswordResetRequest(email);
    };

    return (
        <div className="App-header">
        <h1>Reset your password</h1>
        <div className='form-container'>
        <form onSubmit={handleSubmit} className='profile-form'>
            {<input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />}
            <button type="submit">Send Reset Link</button>
            <BackButton />
        </form>
        </div>
        </div>
    );
}
export default PasswordResetRequest;