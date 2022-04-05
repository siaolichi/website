import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
	return (
		<div className='navbar-container'>
			<div className='nav-text'>
				<Link to='/'>HOME</Link>
			</div>
			<div className='nav-text'>
				<Link to='/art-works'>WORKS</Link>
			</div>
			<div className='nav-text'>
				<Link to='/web-works'>WEBSITE</Link>
			</div>
		</div>
	);
};

export default Nav;
