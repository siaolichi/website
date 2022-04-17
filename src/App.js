import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ParallaxProvider } from 'react-scroll-parallax';

import './App.scss';

import ArtSliders from './views/ArtSliders';
import ArtWorkPage from './views/ArtWorkPage';
import Web from './views/Web';
import Home from './views/Home';
import Nav from './components/Nav';
import Canvas from './components/three/Canvas';

import { Provider } from './contexts';

function App() {
	const location = useLocation();

	return (
		<ParallaxProvider>
			<Provider>
				<Nav />
				<div>
					<Canvas />
				</div>
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
		</ParallaxProvider>
	);
}

export default App;
