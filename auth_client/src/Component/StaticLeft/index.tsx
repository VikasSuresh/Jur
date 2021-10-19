import React from 'react';
import './index.css';

const StaticLeft = () => (
    <div className="col-sm-4 staticLeft">
        <a className="navbar-brand " href="/">
            <img className="nameImage" src="name.png" alt="Jur" />
        </a>
        <h1 className="text">
            Become a modern
            {' '}
            <br />
            arbitator, Now.
        </h1>
        <img className="userImage" src="user.png" alt="User" />
    </div>

);

export default StaticLeft;
