/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { TweenMax } from 'gsap/all';

import ArtSliders from './ArtSliders';
import ArtWorkPage from './ArtWorkPage';

const startState = { autoAlpha: 0, y: -50 };

const Art = ({ show }) => {
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
        <Route exact path='/art-works'>
          {({ match }) => <ArtSliders show={match !== null} match={match} />}
        </Route>
        <Route path='/art-works/:id'>
          {({ match }) => <ArtWorkPage show={match !== null} match={match} />}
        </Route>
      </div>
    </Transition>
  );
};

const backgorundStyle = {
  background:
    'linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
  position: 'related',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  zIndex: '-2',
  overflowX: 'hidden',
};

export default Art;
