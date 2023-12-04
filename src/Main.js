// src/Home.js

import React from 'react';
import Header from './header';
import Footer from './footer';
import Main from './Images/Main(2).png';

function Home() {
    return (
        <div className='App'>
        <Header/>
        <div className='image-container'>
        <div className='image-text'>
        </div>
        <img src={Main} alt="Main Visual" />
        </div>
        <div className='main-text'>
            <h2>Welcome to the Demo-App</h2>
        </div>
        <div className='main-text2'>
        <h2>Quick introduction:</h2>
            <p> This interactive demonstration showcases a dynamic login system with dual user roles: 
                Paid and Free. Experience firsthand how your access changes between these states by toggling the user status within the demo. Each state grants different levels of content visibility, reflecting the features available to paid versus free subscribers.
            </p> 

            <p>Comprehensive User Experience Across Platforms</p>
            <p> Our commitment to a seamless user experience extends beyond this web application. A corresponding Android app is available, ensuring you enjoy consistent access and functionality. 
                The mobile app syncs flawlessly with the web platform, allowing you to switch between devices while retaining the same user profile and data.</p>
                
                <p>Full-Featured User Functionality</p>
                <p>To explore the full spectrum of user features, we invite you to create a personal account. 
                This step unlocks the ability to modify user settings and preferences, providing a complete overview of the system's capabilities.
                Please note that the demo account is read-only and cannot be used to test these features.</p>
                <p>Creating Your Account</p>
                <p>Signing up is simple and grants you immediate access to all user functionalities. Test drive the account settings, manage your subscription status, and personalize your experience just as a real user would. 
                Dive into the Demo App today and discover the full potential of our login system, designed for flexibility and crafted for a superior user experience.</p>
        </div>
            <Footer/>
            </div>
    );
}

export default Home;
