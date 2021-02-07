import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  showUploadAvatar,
  resetPage,
  setSearch,
  showUploadImage
} from '../../actions/utils';
import { getImages } from '../../actions/images';
import UploadImage from '../images/UploadImage';
import { logout } from '../../actions/auth';
import perfil from '../../img/perfil.jpg';

const Navbar = ({
  isAuthenticated,
  user,
  showUploadAvatar,
  getImages,
  images,
  page,
  resetPage,
  setSearch,
  showUploadImage,
  logout
}) => {
  const [show, setShow] = useState({ isclicked: false, show: 'hidden' });
  const [showUser, setShowUser] = useState('');

  useEffect(() => {
    console.log('tratando de esconder');

    isAuthenticated ? setShowUser('') : setShowUser('hidden');
  }, [isAuthenticated]);

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

  const logOut = () => {
    logout();
    setShow({ isclicked: false, show: 'hidden' });
  };

  return (
    <div className='w-full relative '>
      <nav className=' bg-gray-800 flex flex-row py-2 items-center relative h-20'>
        <Link className='z-40' to='/'>
          <i className='fas fa-camera-retro text-blue-500 ml-3 fa-3x m-0 p-0  m-0 p-0 z-40 hover:text-blue-600'></i>
        </Link>
        <div className='bg-white logo-w ml-3 absolute z-30 '></div>

        <h1 className=' font-bold text-lg text-white ml-2 nav-title d-sm'>
          <span className='text-blue-500 '>Shared</span> Photos
        </h1>

        <input
          type='search'
          className='ml-8 search-w pl-4 font-medium mr-3 sm-ml'
          placeholder='Search for free photos'
          onChange={(e) => onChange(e.target.value)}
        />

        <h4 className={`text-white font-bold ml-auto welcome d-sm ${showUser}`}>
          <span className='text-blue-500'>Welcome</span> {user.name}
        </h4>
        <img
          className={`ml-auto mr-3 rounded-full h-14 w-14 flex items-center justify-center cursor-pointer object-cover ${showUser}`}
          onClick={() => dropDown()}
          src={user.avatar ? user.avatar : perfil}
          alt={user.name}
        />
      </nav>

      <span
        className={`absolute  w-64 right-0 mr-3 mt-2 rounded shadow-md flex flex-col items-center ${show.show} z-40 bg-white`}
      >
        <div className='relative flex flex-row justify-center h-16 mt-3 '>
          <img
            src={user.avatar ? user.avatar : perfil}
            alt={user.name}
            className='rounded-full h-16 w-16 object-cover'
          />

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
        <div
          className='border rounded-full py-1 px-4 mt-3 hover:bg-gray-100 cursor-pointer'
          onClick={() => showUploadImage('')}
        >
          Upload image
        </div>
        <Link to={`/profile/view/${user.id}`}>
          <div className='border rounded-full py-1 px-4 mt-3 hover:bg-gray-100 cursor-pointer'>
            My images
          </div>
        </Link>
        <hr className='w-full mt-5' />

        <button
          className='border rounded-full py-1 px-4 my-3 hover:bg-gray-100 cursor-pointer '
          onClick={() => logOut()}
        >
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
  setSearch: PropTypes.func.isRequired,
  showUploadImage: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
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
  setSearch,
  showUploadImage,
  logout
})(Navbar);
