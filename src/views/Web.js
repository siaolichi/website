/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import WebCard from '../components/WebCard';

const Web = () => {
	return (
		<div style={backgorundStyle}>
			<WebCard name='loka' url='https://loka-location.com' />
			<WebCard name='fun' url='https://fun.hsiao-li-chi.com' />
			<WebCard name='imrx' url='https://imrx.com' />
			<WebCard name='maxium' url='https://siao.io/no-time-for-names/' />
		</div>
	);
};

const backgorundStyle = {
	position: 'absolute',
	top: '0',
	left: '0',
	width: '100%',
	height: '100%',
	padding: '10%',
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
	flexWrap: 'wrap'
};

export default Web;
