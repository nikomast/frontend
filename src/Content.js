// src/ContentPage.js
import React from 'react';
import { Link } from 'react-router-dom';


function ContentPage() {
    return (
        <div className="App-header">
            <h1>Exclusive Content</h1>
            <p>This content is only for logged-in users.</p>
            <div><Link to="/profile" className="button-style">Profile</Link></div>
        </div>
    );
}

export default ContentPage;
