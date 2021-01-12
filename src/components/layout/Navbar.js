import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ isAuthenticated, user }) => {
  const [show, setShow] = useState({ isclicked: false, show: 'hidden' });

  const dropDown = () => {
    if (!show.isclicked) {
      setShow({ isclicked: true, show: '' });
    } else {
      setShow({ isclicked: false, show: 'hidden' });
    }
  };

  return (
    <div className='w-full relative'>
      <nav className='w-screen bg-gray-900 flex flex-row py-2 items-center relative'>
        <i className='fas fa-camera-retro text-blue-500 ml-3 fa-3x m-0 p-0  m-0 p-0 z-40'></i>
        <div className='bg-white logo-w ml-3 absolute z-30 '></div>

        <h1 className=' font-bold text-lg text-white ml-2'>Shared Photos </h1>

        <input
          type='search'
          className='ml-8 search-w pl-4 font-medium'
          placeholder='Search for free photos'
        />

        <button
          className='text-white bg-blue-500 ml-auto mr-3 rounded-full h-16 w-16 flex items-center justify-center hover:bg-blue-600'
          onClick={() => dropDown()}
        >
          Avatar
        </button>
      </nav>
      <span
        className={`absolute  h-64 w-64 right-0 mr-3 mt-2 rounded shadow-md flex flex-col items-center ${show.show}`}
      >
        <div className='relative flex flex-row justify-center h-16 mt-3 '>
          <div className=' flex flex-row text-white bg-blue-500 rounded-full h-16 w-16 items-center justify-center'>
            avatar
          </div>
          <Link
            to='/uploadAvatar'
            className='absolute flex rounded-full h-6 w-6 bg-white items-center justify-center shadow-md cursor-pointer hover:text-blue-400 bottom-0 right-0'
          >
            <i className='fas fa-camera '></i>
          </Link>
        </div>

        <h1 className='text-lg'>{user.name}</h1>
        <h3 className='text-base text-gray-500'>{user.email}</h3>

        <button className='border rounded-full py-1 px-4 mt-3 hover:bg-gray-100'>
          Manage your Account
        </button>

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
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default connect(mapStateToProps)(Navbar);
