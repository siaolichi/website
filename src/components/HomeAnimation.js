import React from 'react';
import Canvas from './three/Canvas';

const HomeAnimation = () => {
	return (
		<div style={{ height: '100vh', width: '100vw', position: 'fixed' }}>
			<Canvas></Canvas>
		</div>
	);
};

export default HomeAnimation;
