import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import AwesomeSlider from 'react-awesome-slider';
import * as works from '../assets/works.js';

import './ArtWorkPage.scss';

const ArtWorkPage = () => {
	const { id } = useParams();
	if (!id) return <Fragment />;

	const work = works.default.filter((work) => work.id === id)[0];

	return (
		<div className='work-page'>
			<div style={{ margin: '30px' }}>
				<Link to='/art-works' className='back-button-container'>
					<ArrowBackIosIcon className='back-button' />
				</Link>
			</div>
			<div className='work-content'>
				<h1 className='title'>{work.title}</h1>
				<div className='year'>{work.year}</div>
				{work.video && (
					<div className='video-container'>
						<iframe
							src={work.video}
							title={work.title}
							className='video-frame'
							frameBorder='0'
							allow='autoplay; fullscreen'
							allowFullScreen
						></iframe>
					</div>
				)}
				<AwesomeSlider style={{ marginBottom: '80px' }}>
					{work.photos.length > 1 &&
						work.photos.map((photo, index) => (
							<div key={index}>
								<img src={require(`../assets/images/${work.id}/${photo}`)} />
							</div>
						))}
				</AwesomeSlider>

				<div className='description' dangerouslySetInnerHTML={{ __html: work.description }} />
			</div>
		</div>
	);
};

export default ArtWorkPage;
