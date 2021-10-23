import React from 'react';
import './index.css';
import Store from '../../Store';

const Nav = () => (
    <nav className="navbar fixed-top navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar" href="/">
                <img id="navbarImg" src="name.png" alt="Jur" />
            </a>
            <div className="float-right">
                <button
                    type="button"
                    className="btn btn-default "
                >
                    <span>Dashboard</span>
                </button>
                <button type="button" className="btn btn-danger btn-circle">
                    {Store.fetchName}
                </button>
                <button
                    type="button"
                    className="btn btn-default float-right"
                    onClick={Store.logout}
                >
                    <span>Logout</span>
                </button>
            </div>
        </div>
    </nav>
);

export default Nav;
