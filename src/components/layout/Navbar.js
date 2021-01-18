import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showUploadAvatar, resetPage, setSearch } from '../../actions/utils';
import { getImages } from '../../actions/images';

const Navbar = ({
  isAuthenticated,
  user,
  showUploadAvatar,
  getImages,
  images,
  page,
  resetPage,
  setSearch
}) => {
  const [show, setShow] = useState({ isclicked: false, show: 'hidden' });

  const dropDown = () => {
    if (!show.isclicked) {
      setShow({ isclicked: true, show: '' });
    } else {
      setShow({ isclicked: false, show: 'hidden' });
    }
  };
  const onChange = (e) => {
    setSearch(e);
    console.log(e);
    getImages(1, e);
    resetPage();
  };

  return (
    <div className='w-full relative'>
      <nav className=' bg-gray-900 flex flex-row py-2 items-center relative'>
        <i className='fas fa-camera-retro text-blue-500 ml-3 fa-3x m-0 p-0  m-0 p-0 z-40'></i>
        <div className='bg-white logo-w ml-3 absolute z-30 '></div>

        <h1 className=' font-bold text-lg text-white ml-2'>Shared Photos </h1>

        <input
          type='search'
          className='ml-8 search-w pl-4 font-medium'
          placeholder='Search for free photos'
          onChange={(e) => onChange(e.target.value)}
        />

        <img
          className='ml-auto mr-3 rounded-full h-16 w-16 flex items-center justify-center hover:bg-blue-600 cursor-pointer'
          onClick={() => dropDown()}
          src={user.avatar}
          alt={user.name}
        />
      </nav>
      <span
        className={`absolute  h-64 w-64 right-0 mr-3 mt-2 rounded shadow-md flex flex-col items-center ${show.show} z-40 bg-white`}
      >
        <div className='relative flex flex-row justify-center h-16 mt-3 '>
          <div className=' flex flex-row text-white bg-blue-500 rounded-full h-16 w-16 items-center justify-center'>
            avatar
          </div>

          <i
            onClick={() => showUploadAvatar('')}
            className='fas fa-camera absolute flex rounded-full h-6 w-6 bg-white items-center justify-center shadow-md cursor-pointer hover:text-blue-400 bottom-0 right-0'
          ></i>
        </div>

        <h1 className='text-lg'>{user.name}</h1>
        <h3 className='text-base text-gray-500'>{user.email}</h3>

        <Link
          to='/myProfile'
          className='border rounded-full py-1 px-4 mt-3 hover:bg-gray-100'
        >
          Manage your Account
        </Link>

        <hr className='w-full mt-5' />

        <button className='border rounded-full py-1 px-4 mt-3 hover:bg-gray-100 '>
          Log Out
        </button>
      </span>
    </div>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  showUploadAvatar: PropTypes.func.isRequired,
  images: PropTypes.object.isRequired,
  getImages: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  images: state.image.images
});
export default connect(mapStateToProps, {
  showUploadAvatar,
  getImages,
  resetPage,
  setSearch
})(Navbar);
