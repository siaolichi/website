import React from 'react';

const WebCard = ({ name, url }) => {
  return (
    <div>
      <a href={url}>
        <div
          alt={name}
          style={{
            backgroundImage:
              'url(' +
              require(`../assets/images/websiteImage/${name}.png`) +
              ')',
            width: '300px',
            height: '300px',
            borderRadius: '150px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </a>
      <div
        style={{
          textTransform: 'uppercase',
          textAlign: 'center',
          marginTop: '20px',
          color: 'white',
          fontFamily: 'Amatic SC',
          fontWeight: '700',
          fontSize: '1.5rem',
        }}
      >
        {name}
      </div>
    </div>
  );
};

export default WebCard;
