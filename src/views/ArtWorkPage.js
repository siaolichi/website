import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import * as works from '../assets/works.js';
import './ArtWorkPage.scss';
import PhotoModal from '../components/PhotoModal.js';

const ArtWorkPage = () => {
	const { id } = useParams();
	console.log(id);

	const [modal, setModal] = useState({ show: false, imageSrc: '', index: 0 });
	if (!id) return <Fragment />;
	const work = works.default.filter((work) => work.id === id)[0];

	const nextImage = () => {
		console.log(work.photos.length - 1);
		if (modal.index < work.photos.length - 1)
			setModal({
				...modal,
				index: modal.index + 1,
				imageSrc: require(`../assets/images/${work.id}/${work.photos[modal.index + 1]}`)
			});
		else
			setModal({
				...modal,
				index: 0,
				imageSrc: require(`../assets/images/${work.id}/${work.photos[0]}`)
			});
	};
	const lastImage = () => {
		if (modal.index > 0)
			setModal({
				...modal,
				index: modal.index - 1,
				imageSrc: require(`../assets/images/${work.id}/${work.photos[modal.index - 1]}`)
			});
		else
			setModal({
				...modal,
				index: work.photos.length - 1,
				imageSrc: require(`../assets/images/${work.id}/${work.photos[work.photos.length - 1]}`)
			});
	};

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
				<div className='images'>
					{work.photos.map((photo, index) => (
						<div
							key={index}
							style={{
								width: 'calc(33% - 10px)',
								height: '150px',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								cursor: 'pointer',
								marginBottom: '10px',
								backgroundImage: 'url(' + require(`../assets/images/${work.id}/${photo}`) + ')'
							}}
							onClick={() => {
								setModal({
									show: true,
									index,
									imageSrc: require(`../assets/images/${work.id}/${photo}`)
								});
							}}
						/>
					))}
				</div>
				<div className='description' dangerouslySetInnerHTML={{ __html: work.description }} />
			</div>
			<PhotoModal
				image={modal.imageSrc}
				nextImage={nextImage}
				lastImage={lastImage}
				show={modal.show}
				removeModal={() => {
					setModal({ show: false, imageSrc: '' });
				}}
			/>
		</div>
	);
};

export default ArtWorkPage;
