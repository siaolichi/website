import React from 'react';
import {Transition} from 'react-transition-group';
import {TweenMax} from 'gsap/all';
import MaterialIcon from '@material/react-material-icon';
import './PhotoModal.scss';

const PhotoModal = ({image, removeModal, show, lastImage, nextImage}) => {
    return (
        <Transition
            timeout={1000}
            mountOnEnter
            unmountOnExit
            in={show}
            addEndListener={(node, done) => {
                TweenMax.to(node, 0.35, {
                    autoAlpha: show ? 1 : 0,
                    onComplete: done,
                    delay: 0,
                });
            }}
        >
            <div className='photo-modal'>
                <div className='background' onClick={removeModal}>
                    <img src={image} alt='detail' style={{objectFit: 'contain', width: '100%', height: '100%'}} />
                </div>
                <MaterialIcon icon='arrow_back_ios' className='back-button' onClick={lastImage} />
                <MaterialIcon icon='arrow_forward_ios' className='next-button' onClick={nextImage} />
            </div>
        </Transition>
    );
};

export default PhotoModal;
