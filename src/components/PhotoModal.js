import React from 'react';
import { Transition } from 'react-transition-group';
import { TweenMax } from 'gsap/all';

const PhotoModal = ({ image, removeModal, show }) => {
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
      <div
        style={{
          position: 'fixed',
          zIndex: '10',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={removeModal}
      >
        <img src={image} alt='detail' />
      </div>
    </Transition>
  );
};

export default PhotoModal;
