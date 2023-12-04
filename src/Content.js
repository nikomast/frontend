// src/ContentPage.js
import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';

function ContentPage({ isLoggedIn }) {
    const [isPaidUser, setIsPaidUser] = useState(false);

    useEffect(() => {
        const checkPaidStatus = async () => {
            const authToken = sessionStorage.getItem('authToken');
            const response = await fetch('https://loginbackend-pcvcxm53jq-lz.a.run.app/api/check-paid-status/', {
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
        <div className='App'>
            <Header isLoggedIn={isLoggedIn}/>
            <div className="App-header">
            <div className='image-container'>
                <h1>Exclusive Content</h1>
            </div>
            <div className="regular-user-content">
                <p>This content is only for logged-in users. Go to your profile, activate the paiduser option (for free) and test the paiduser experience</p>
            </div>
            <div className="paid-user-content">
            {isPaidUser && <p>This is exclusive content for our paid users.</p>}
            </div>
        </div>
            <Footer/>
        </div>
    );
}

export default ContentPage;


