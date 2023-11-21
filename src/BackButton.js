// BackButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate('/login')}>
            Back to Login
        </button>
    );
}

export default BackButton;
