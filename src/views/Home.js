import React, { useContext, useRef } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import HomeAnimation from '../components/HomeAnimation';
import { Context } from '../contexts';
import Spinner from '../components/Spinner';
import InfoModal from '../components/InfoModal';
import { margin } from '@mui/material/node_modules/@mui/system';

const Home = () => {
	const { state } = useContext(Context);
	const infoRef = useRef(null);

	const scrollToBottom = () => {
		console.log('scroll to buttom');
		infoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<div style={{ overflowX: 'scroll' }}>
			{state === false && <Spinner />}
			<HomeAnimation />
			<KeyboardArrowDownRoundedIcon style={iconStyle} onClick={scrollToBottom} />
			<div ref={infoRef}>
				<InfoModal />
			</div>
		</div>
	);
};
export default Home;

const iconStyle = {
	width: '100%',
	height: '64px',
	color: 'white',
	transform: 'translateY(-120px)',
	cursor: 'pointer'
};
