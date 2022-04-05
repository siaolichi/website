import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ArtCard from '../components/ArtCard';
import { TransitionGroup } from 'react-transition-group';

import * as works from '../assets/works.js';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useEffectListener from '../hooks/useEffectListener';

const cards = works.default;

const ArtSliders = ({ show }) => {
	const slideRef = useRef(null);
	const targetRef = useRef(null);
	const [targetLeft, setTargetLeft] = useState('');
	const [state, setState] = useState({ isScrolling: false, clientX: 0, dragging: false, currentX: 0 });

	const params = useLocation();
	console.log(params);

	const onScroll = (e) => {
		const percentage = (slideRef.current.scrollLeft / (300 * cards.length - window.innerWidth)) * 100;
		setTargetLeft(`calc( ${percentage}% - 20px`);
	};
	useEffectListener('scroll', onScroll, slideRef.current);
	const onMouseDown = (e) => {
		e.persist();
		if (e.clientX)
			setState((s) => ({
				isScrolling: true,
				dragging: false,
				clientX: e.clientX,
				currentX: slideRef.current.scrollLeft
			}));
	};

	const onMouseUp = (e) => {
		console.log('Mouse Up');
		e.persist();
		setState((s) => ({ ...s, isScrolling: false, dragging: false }));
	};
	const onMouseMove = (e, callbackState) => {
		e.preventDefault();
		const { isScrolling, clientX, currentX } = state;
		if (isScrolling) {
			console.log(e.clientX, clientX);
			slideRef.current.scrollLeft = -e.clientX + clientX + currentX;
			setState((s) => ({ ...s, dragging: true }));
		}
	};
	return (
		<div
			className='art-slider-page'
			style={{
				width: '100%',
				height: '100%',
				overflow: 'hidden'
			}}
		>
			<div
				style={{ overflowX: 'scroll', height: 'calc( 100% + 12px)' }}
				ref={slideRef}
				onMouseDown={onMouseDown}
				onMouseMove={(e) => onMouseMove(e, state)}
				onMouseUp={onMouseUp}
			>
				<div
					style={{
						height: '30%',
						position: 'fixed',
						width: '60%',
						left: '10%',
						top: '100px'
					}}
				>
					<div style={{ marginLeft: targetLeft }}>
						<ArrowDropDownIcon style={{ color: 'white', fontSize: '3rem' }} />
					</div>
					<div ref={targetRef} style={{ borderBottom: '1.5px solid white', height: '10px' }} />
					<div
						style={{
							float: 'left',
							color: 'white',
							fontFamily: 'Amatic SC',
							fontWeight: '700',
							fontSize: '1.2rem'
						}}
					>
						2020
					</div>
					<div
						style={{
							float: 'right',
							color: 'white',
							fontFamily: 'Amatic SC',
							fontWeight: '700',
							fontSize: '1.2rem'
						}}
					>
						2016
					</div>
				</div>
				<TransitionGroup
					style={{
						display: 'flex',
						width: 300 * cards.length + 'px',
						justifyContent: 'space-around',
						height: '100%',
						alignItems: 'flex-end',
						flexDirection: 'row'
					}}
				>
					{cards.map((card, index) => {
						return <ArtCard key={index} card={card} index={index} dragging={state.dragging} />;
					})}
				</TransitionGroup>
			</div>
		</div>
	);
};

export default ArtSliders;
