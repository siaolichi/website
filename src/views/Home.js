import React, { useContext, useRef } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

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

	const scrollToTop = () => {
		console.log('scroll to top');
		pageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<div className='page'>
			{state === false && <Spinner />}
			<div style={{ height: '100vh', width: '100vw' }} ref={pageRef} />
			<KeyboardArrowDownRoundedIcon style={arrowDownStyle} onClick={scrollToBottom} />
			<KeyboardArrowDownRoundedIcon style={arrowUpStyle} onClick={scrollToTop} />
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
	color: 'white',
	transform: 'translateY(-120px)',
	cursor: 'pointer',
	stroke: '#b99cff'
};
const arrowUpStyle = {
	width: '100%',
	height: '64px',
	color: 'white',
	transform: 'translateY(120px) rotate(180deg)',
	cursor: 'pointer'
};
