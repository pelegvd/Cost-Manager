/* Peleg Vadbeker 209485838
   Eden Blau 208571927
   Dudi Kreis 311333900
*/

import React from 'react';
import './Navbar.css';
import AppLogo from './AppLogo.JPG';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <a className="backHome" href="/">
                <img className={"logo"} src={AppLogo} alt={"logo"}/>
            </a>

            <div className="links_container">
                <Link to="/" className="links">Home</Link>
                <Link to="/report" className="links">Report</Link>
                <Link to="/about" className="links">About</Link>

            </div>
        </nav>
    );
}

export default Navbar;
