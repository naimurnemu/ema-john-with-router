import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <img className="logo" src={logo} alt="" />
            <nav>
                <NavLink className="nav-link" to="/shop">Shop</NavLink>
                <NavLink className="nav-link" to="/review">Order Review</NavLink>
                <NavLink className="nav-link" to="/inventory">Manage Inventory</NavLink>
            </nav>
        </div>
    );
};

export default Header;