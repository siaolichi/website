/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { TweenMax } from 'gsap/all';

import WebCard from '../components/WebCard';
const startState = { autoAlpha: 0, y: -50 };

const Web = ({ show }) => {
  // const { setLoaded, startLoading } = useContext(Context);
  useEffect(() => {
    // startLoading();
  }, []);
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
        <WebCard name='loka' url='https://loka-location.com' />
        <WebCard name='fun' url='https://fun.hsiao-li-chi.com' />
      </div>
    </Transition>
  );
};

const backgorundStyle = {
  background:
    'linear-gradient(180deg, rgba(234,238,174,1) 0%, rgba(148,233,233,1) 100%)',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  padding: '10%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
};

export default Web;
