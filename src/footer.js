import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="bottom-header">
            <p>© 2023 Your Company Name. All rights reserved.</p>
            <div className="footer-links">
                <Link to="">Privacy Policy</Link>
                <Link to="">Terms of Service</Link>
            </div>
        </div>
    );
}

export default Footer;
