<<<<<<< HEAD
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="brand">Koa</div>
                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/calendar" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Calendar
                    </NavLink>
                </div>
=======
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ toggleCalendar }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button className="menu-btn" onClick={toggleCalendar} aria-label="Toggle Calendar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="brand">Koa</div>
>>>>>>> 5177397df4a60232f23e16c446e5470f937eaad5
            </div>

            <div className="navbar-center">
                <div className="search-bar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="navbar-right">
                <div className="profile-placeholder"></div>
            </div>
        </nav>
    );
};

export default Navbar;
