import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

const ImageItems = ({ image }) => {
  const [show, setShow] = useState('hidden');

  return (
    <div
      className='relative flex-shrink m-1'
      onMouseEnter={() => setShow('')}
      onMouseLeave={() => setShow('hidden')}
    >
      <a href={image.src}>
        <img
          src={image.src}
          alt=''
          className='relative cursor-pointer'
          style={{
            minWidth: '20rem',
            maxWidth: '30rem',
            minHeight: '20rem',
            maxHeight: '30rem'
          }}
        />
      </a>

      <span
        className={`flex flex-row items-center absolute bottom-0 left-0  text-white bg-black w-full bg-opacity-50 ${show}`}
      >
        <img
          src={image.avatar}
          alt={image.name}
          className='ml-3 w-10 h-10 my-2 rounded-full mr-3 cursor-pointer'
        />
        <p>{image.userName}</p>
      </span>
    </div>
  );
};

ImageItems.propTypes = {};

export default ImageItems;
