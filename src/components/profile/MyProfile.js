import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UploadAvatar from '../images/UploadAvatar';
import Footer from '../layout/Footer';
import { showUploadAvatar } from '../../actions/utils';
import { updateProfile } from '../../actions/profiles';
import UploadImage from '../images/UploadImage';
import perfil from '../../img/perfil.jpg';

const MyProfile = ({ user, showUploadAvatar, updateProfile, successAlert }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [success, setSuccess] = useState({
    name: 'name',
    email: 'email',
    password: 'password'
  });

  const [hide, setHide] = useState({
    name: '',
    email: '',
    password: ''
  });
  useEffect(() => {
    setForm({ name: user.name, email: user.email });
  }, [user]);
  const { name, email, password } = form;

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.name);
    if (e.target.name === 'name') {
      setHide({ ...hide, name: 'hidden' });
    }
    console.log(hide);
    if (e.target.name === 'email') {
      setHide({ ...hide, email: 'hidden' });
    }

    if (e.target.name === 'password') {
      setHide({ ...hide, password: 'hidden' });
    }
  };

  const saveName = (e) => {
    e.preventDefault();
    updateProfile(name, '', '');
    setHide({ ...hide, name: '' });
  };

  const savePassword = (e) => {
    e.preventDefault();
    if (password) {
      updateProfile('', '', password);
      setHide({ ...hide, password: '' });
    }
  };

  const saveEmail = (e) => {
    e.preventDefault();
    updateProfile('', email, '');
    setHide({ ...hide, email: '' });
  };
  return (
    <div className='flex flex-col w-full  relative'>
      <Navbar />
      <UploadAvatar />
      <UploadImage />
      <div className='grid grid-cols-2  mt-4 mx-2 self-center gap-y-2  profile-grid-w'>
        <div className='bg-gray-200  rounded-l-md  pl-12 items-start justify-center flex flex-col h-40  h-m '>
          <h1 className='text-2xl font-bold font-serif text-gray-600'>Name</h1>
          <p className='text-gray-400 pt-4 '>
            change your name so they can better identify you{' '}
          </p>
        </div>

        <form
          onSubmit={(e) => saveName(e)}
          className='relative bg-white border flex flex-row items-center justify-center px-12 '
        >
          <label htmlFor='name' className='label block font-serif  w-24'>
            Full Name
          </label>
          <input
            type='text'
            name='name'
            placeholder='Jhon Doe'
            className=' text-center login-input-w py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
            required
            onChange={(e) => onChange(e)}
            value={name}
          />
          <button
            type='submit'
            className=' bg-blue-500 text-white py-5 px-5 hover:bg-blue-600 ml-5 rounded'
          >
            Save
          </button>

          <span
            className={`absolute text-green-500 bottom-0 mb-3 ${hide.name}`}
          >
            {successAlert.name}
          </span>
        </form>

        <div className='bg-gray-200 pl-12 rounded-l-md   items-start justify-center flex flex-col h-40  h-m '>
          <h1 className='text-2xl font-bold font-serif text-gray-600'>Email</h1>
          <p className='text-gray-400 pt-4 '>Change your email </p>
        </div>

        <form
          onSubmit={(e) => saveEmail(e)}
          className='relative bg-white border flex flex-row items-center justify-center px-12 '
        >
          <label htmlFor='email' className='label block font-serif w-24'>
            Email
          </label>
          <input
            type='email'
            name='email'
            placeholder='example@example.com'
            className=' text-center login-input-w py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
            required
            onChange={(e) => onChange(e)}
            value={email}
          />
          <button
            type='submit'
            className=' bg-blue-500 text-white py-5 px-5 hover:bg-blue-600 ml-5 rounded'
          >
            Save
          </button>

          <span
            className={`absolute text-green-500 bottom-0 mb-3 ${hide.email}`}
          >
            {successAlert.email}
          </span>
        </form>

        <div
          onSubmit={(e) => savePassword(e)}
          className='bg-gray-200  rounded-l-md  pl-12 items-start justify-center flex flex-col h-40 h-m '
        >
          <h1 className='text-2xl font-bold font-serif text-gray-600'>
            Password
          </h1>
          <p className='text-gray-400 pt-4 '>
            Change your password for more security{' '}
          </p>
        </div>

        <form className='relative bg-white border flex flex-row items-center justify-center px-12 '>
          <label htmlFor='password' className='label block font-serif w-24'>
            Password
          </label>
          <input
            type='password'
            name='password'
            placeholder='**************************'
            className=' text-center login-input-w py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
            required
            onChange={(e) => onChange(e)}
            value={password}
          />
          <button
            type='submit'
            className=' bg-blue-500 text-white py-5 px-5 hover:bg-blue-600 ml-5 rounded'
          >
            Save
          </button>
          <span
            className={`absolute text-green-500 bottom-0 mb-3 ${hide.password}`}
          >
            {successAlert.password}
          </span>
        </form>

        <div className='bg-gray-200  rounded-l-md  pl-12 items-start justify-center flex flex-col h-40 h-m'>
          <h1 className='text-2xl font-bold font-serif text-gray-600'>
            Avatar
          </h1>
          <p className='text-gray-400 pt-4 '>
            change your profile picture so people can get to know you
          </p>
        </div>

        <div className='bg-white border flex flex-row items-center justify-center px-12  border-image'>
          <label htmlFor='photo' className='label block font-serif w-24'>
            Avatar
          </label>
          <div className='login-input-w px-3 border-gray-200 rounded-md flex flex-row items-center h-32 justify-center'>
            <img
              className=' h-full w-full rounded'
              src={user.avatar ? user.avatar : perfil}
              alt={user.name}
            />
          </div>

          <button
            className=' bg-blue-500 text-white py-5 px-2 hover:bg-blue-600 ml-5  rounded'
            onClick={() => showUploadAvatar('')}
          >
            Change
          </button>
        </div>
      </div>
      <div className='w-full mt-12'>
        <Footer />
      </div>
    </div>
  );
};

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  showUploadAvatar: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  successAlert: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  successAlert: state.profile.updateProfile.success
});

export default connect(mapStateToProps, { showUploadAvatar, updateProfile })(
  MyProfile
);
