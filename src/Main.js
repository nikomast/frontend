// src/Home.js
import React from 'react';
import { Link} from 'react-router-dom';

function Home() {
    return (
        <div className="App-header">
            <h1>Welcome to the App</h1>
            <p>This is the home page of the application.</p>
            <Link to="/login" className="button-style">login</Link>
            </div>
    );
}

export default Home;
