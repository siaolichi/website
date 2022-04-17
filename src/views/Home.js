import React, { useContext, useRef } from 'react';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';

import { Context } from '../contexts';
import Spinner from '../components/Spinner';
import InfoModal from '../components/InfoModal';

const Home = () => {
	const { state } = useContext(Context);
	const pageRef = useRef(null);
	const infoRef = useRef(null);

	const scrollToBottom = () => {
		console.log('scroll to buttom');
		infoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<div className='page'>
			{state === false && <Spinner />}
			<div style={{ height: '100vh', width: '100vw' }} ref={pageRef} />
			<div style={scrollDownButtonStyle} onClick={scrollToBottom}>
				Scroll down
				<KeyboardDoubleArrowDownRoundedIcon style={arrowDownStyle} />
			</div>
			<div ref={infoRef}>
				<InfoModal />
			</div>
		</div>
	);
};
export default Home;

const arrowDownStyle = {
	width: '100%',
	height: '64px',
	color: 'white'
};
const scrollDownButtonStyle = {
	color: 'white',
	cursor: 'pointer',
	transform: 'translateY(-120px)',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	textShadow: '0 0 10px #4c00ff, 0 0 20px #4c00ff, 0 0 40px #4c00ff',
	fontFamily: 'Fugaz One'
};
