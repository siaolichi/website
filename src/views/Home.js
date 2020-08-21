import React, { useContext } from 'react';
import { Transition } from 'react-transition-group';
import { TweenMax } from 'gsap/all';

import HomeAnimation from '../components/HomeAnimation';
import { Context } from '../contexts';
import Spinner from '../components/Spinner';

const startState = { autoAlpha: 0, y: -50 };

const Home = ({ show }) => {
  const { state } = useContext(Context);
  return (
    <Transition
      unmountOnExit
      in={show}
      timeout={1000}
      onEnter={(node) => TweenMax.set(node, startState)}
      addEndListener={(node, done) => {
        TweenMax.to(node, 0.5, {
          autoAlpha: show ? 1 : 0,
          y: show ? 0 : 50,
          onComplete: done,
        });
      }}
    >
      <div style={backgorundStyle}>
        {state === false && <Spinner />}
        <HomeAnimation />
      </div>
    </Transition>
  );
};
const backgorundStyle = {
  background:
    'linear-gradient(0deg, rgba(189,174,238,1) 0%, rgba(148,233,193,1) 100%)',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  zIndex: '-2',
};
export default Home;
