import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
  return (
    <div className='navbar-container'>
      <div className='nav-text'>
        <Link to='/'>Home</Link>
      </div>
      <div className='nav-text'>
        <Link to='/art-works'>Art</Link>
      </div>
      <div className='nav-text'>
        <Link to='/web-works'>Web</Link>
      </div>
    </div>
  );
};

export default Nav;
