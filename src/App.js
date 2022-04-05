import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './App.scss';

import ArtSliders from './views/ArtSliders';
import ArtWorkPage from './views/ArtWorkPage';
import Web from './views/Web';
import Home from './views/Home';
import Nav from './components/Nav';
import { Provider } from './contexts';

function App() {
	const location = useLocation();
	return (
		<div style={backgorundStyle}>
			<Provider>
				<Nav />
				<TransitionGroup component={null}>
					<CSSTransition key={location.key} timeout={1000} classNames='fade'>
						<Routes>
							<Route path='art-works' exact element={<ArtSliders />} />
							<Route path='art-works/:id' element={<ArtWorkPage />} />
							<Route path='web-works' element={<Web />} />
							<Route path='/' exact element={<Home />} />
						</Routes>
					</CSSTransition>
				</TransitionGroup>
			</Provider>
		</div>
	);
}

const backgorundStyle = {
	background: 'linear-gradient(360deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
	position: 'related',
	top: '0',
	left: '0',
	width: '100vw',
	height: '100vh',
	zIndex: '-2',
	overflowX: 'hidden'
};

export default App;
