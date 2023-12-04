// BackButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate('/')}>
            Back to Main Page
        </button>
    );
}

export default BackButton;
