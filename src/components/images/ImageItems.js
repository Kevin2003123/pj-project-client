import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import loading from '../../img/loading.gif';
import perfil from '../../img/perfil.jpg';
const ImageItems = ({ image, loadingImages }) => {
  const [show, setShow] = useState('hidden');
  return loadingImages ? (
    <div className='relative min-width mt-1 mx-1 flex items-center justify-center'>
      <img src={loading} alt='loading gift' className='' />
    </div>
  ) : (
    <div
      className='relative  mt-1 mx-1 min-width'
      onMouseEnter={() => setShow('')}
      onMouseLeave={() => setShow('hidden')}
    >
      <a href={image.src} className='' target='_blank'>
        <img
          src={image.src}
          alt=''
          className='relative cursor-pointer img-w '
        />
      </a>

      <span
        className={`flex flex-row items-center absolute bottom-0 left-0  text-white w-full bg-black bg-opacity-50 ${show} `}
      >
        <Link to={`/profile/view/${image.user_id}`}>
          <img
            src={image.avatar ? image.avatar : perfil}
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
