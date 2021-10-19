import React from 'react';
import './index.css';

const Nav = () => {
    let name = localStorage.getItem('name') || '';
    if (name) {
        name = JSON.parse(name);
        name = `${name.split(' ')[0][0]}${name?.split(' ')[1][0]}`;
    }
    return (
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
                        {name}
                    </button>
                    <button
                        type="button"
                        className="btn btn-default float-right"
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = '/login';
                        }}
                    >
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
