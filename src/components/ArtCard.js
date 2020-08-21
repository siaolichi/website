import React from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { TweenMax } from 'gsap/all';

import './ArtCard.scss';

const ArtCard = ({ card, index, in: show }) => {
  const startState = { autoAlpha: 0, y: -50 };
  return (
    <Transition
      timeout={1000}
      mountOnEnter
      unmountOnExit
      appear
      in={show}
      onEnter={(node) => TweenMax.set(node, startState)}
      addEndListener={(node, done) => {
        TweenMax.to(node, 0.5, {
          y: 0,
          autoAlpha: show ? 1 : 0,
          onComplete: done,
          delay: !show ? 0 : index * 0.1 + 0.5,
        });
      }}
    >
      <Link className='card-container' to={`/art-works/${card.id}`}>
        <div className='title'>{card.title}</div>
        <div className='year'>{card.year}</div>
        <div
          alt={card.title}
          className='photo'
          style={{
            backgroundImage:
              'url(' +
              require(`../assets/images/${card.id}/${card.photos[0]}`) +
              ')',
          }}
        />
      </Link>
    </Transition>
  );
};

export default ArtCard;
