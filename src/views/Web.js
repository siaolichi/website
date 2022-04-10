/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const Web = () => {
	return (
		<div style={backgorundStyle}>
			<AwesomeSlider>
				<div
					data-src={require(`../assets/images/websiteImage/loka.png`)}
					onClick={() => window.open('https://loka-location.com', '_blank')}
					style={{ cursor: 'pointer' }}
				/>
				<div
					data-src={require(`../assets/images/websiteImage/imrx.png`)}
					onClick={() => window.open('https://imrx.io', '_blank')}
					style={{ cursor: 'pointer' }}
				/>
				<div
					data-src={require(`../assets/images/websiteImage/fun.png`)}
					onClick={() => window.open('https://fun.hsiao-li-chi.com', '_blank')}
					style={{ cursor: 'pointer' }}
				/>
				<div
					data-src={require(`../assets/images/websiteImage/maxium.png`)}
					onClick={() => window.open('https://siao.io/no-time-for-names/', '_blank')}
					style={{ cursor: 'pointer' }}
				/>
				<div
					data-src={require(`../assets/images/websiteImage/body-clone-2018.png`)}
					onClick={() => window.open('https://siao.io/', '_blank')}
					style={{ cursor: 'pointer' }}
				/>
			</AwesomeSlider>
		</div>
	);
};

const backgorundStyle = {
	position: 'absolute',
	top: '0',
	left: '0',
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
	flexWrap: 'wrap'
};

export default Web;
