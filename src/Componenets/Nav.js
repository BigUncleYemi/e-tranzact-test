import React from 'react';
import * as logo from '../assets/images/logo.png';
import {Link} from 'react-router-dom';

function Nav() {

  function handleLogout(){
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");
  }

  return (
    <header className="masthead mb-5 mt-4">
      <div className="d-flex justify-content-between">
        <a className="navbar-brand" href="/">
          <img src={logo} height="30" className="d-inline-block align-top" alt="e-trazact" />
        </a>
        <nav className="nav nav-masthead justify-content-center">
          <Link className="nav-link a active" to="/profile">Profile</Link>
          <Link className="nav-link a" to="/" onClick={handleLogout}>Logout</Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
