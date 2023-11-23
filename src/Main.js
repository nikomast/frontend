// src/Home.js
import React from 'react';
import { Link} from 'react-router-dom';

function Home() {
    return (
        <div className="App-header">
            <h1>Demo app</h1>
            <p>You are in the home page of the application.</p>
            <Link to="/login" className="button-style">Login</Link>
            <div className="Image-container">
            <img src="Images/code.jpg" alt="" />
            </div>
            </div>
    );
}

export default Home;
