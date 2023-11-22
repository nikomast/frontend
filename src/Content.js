// src/ContentPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ContentPage() {
    const [isPaidUser, setIsPaidUser] = useState(false);

    useEffect(() => {
        const checkPaidStatus = async () => {
            const authToken = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/api/check-paid-status/', {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (response.ok) {
                const data = await response.json();
                setIsPaidUser(data.is_paid_user);
            }
        };
        
        checkPaidStatus();
    }, []);

    return (
        <div className="App-header">
            <h1>Exclusive Content</h1>
            <div><Link to="/profile" className="button-style">Profile</Link></div>
            <div className="regular-user-content">
            <p>This content is only for logged-in users.</p>
            </div>
            <div className="paid-user-content">
            {isPaidUser && <p>This is exclusive content for our paid users.</p>}
            </div>
        </div>
    );
}

export default ContentPage;


