import React from 'react';
import * as logo from '../assets/images/logo.png';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <header className="masthead mb-5 mt-4">
      <div className="d-flex justify-content-between">
        <a class="navbar-brand" href="/">
          <img src={logo} height="30" class="d-inline-block align-top" alt="e-trazact" />
        </a>
        <nav className="nav nav-masthead justify-content-center">
          <Link className="nav-link a active" href="/">Profile</Link>
          <Link className="nav-link a" href="/logout">Logout</Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
