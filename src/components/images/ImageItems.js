import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';

const ImageItems = ({ image }) => {
  const [show, setShow] = useState('hidden');

  return (
    <div
      className='relative bg-black mx-1 mt-1 min-width'
      onMouseEnter={() => setShow('')}
      onMouseLeave={() => setShow('hidden')}
    >
      <a href={image.src} className=''>
        <img
          src={image.src}
          alt=''
          className='relative cursor-pointer img-w '
        />
      </a>

      <span
        className={`flex flex-row items-center absolute bottom-0 left-0  text-white w-full bg-black bg-opacity-50 ${show}`}
      >
        <Link to={`/profile/view/${image.user_id}`}>
          <img
            src={image.avatar}
            alt={image.name}
            className='ml-3 w-10 h-10 my-2 rounded-full mr-3 cursor-pointer object-cover'
          />
        </Link>

        <p>{image.userName}</p>
      </span>
    </div>
  );
};

ImageItems.propTypes = {};

export default ImageItems;
