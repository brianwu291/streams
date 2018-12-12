import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth.js';

const Header = () => {
    return(
        <div className="ui secondary pointing menu">
            <Link to="/" className="active item">
                <i className="tablet alternate icon"></i>
            </Link>
            <div className="right menu">
                <Link to="/" className="active item">
                    All Streams
                </Link>
                <GoogleAuth />
            </div>
        </div>
    );
}

export default Header;