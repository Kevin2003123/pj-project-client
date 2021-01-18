import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UploadAvatar from '../images/UploadAvatar';
import Footer from '../layout/Footer';

const MyProfile = ({ user }) => {
  return (
    <div className='flex flex-col w-full'>
      <Navbar />
      <div className='grid grid-cols-2 w-full mt-4 justify-items-stretch gap-y-2 '>
        <div className='bg-gray-200  rounded-l-md  pl-12 items-start justify-center flex flex-col h-40  '>
          <h1 className='text-2xl font-bold font-serif text-gray-600'>Name</h1>
          <p className='text-gray-400 pt-4 '>
            change your name so they can better identify you{' '}
          </p>
        </div>

        <form className='bg-white border flex flex-row items-center justify-start pl-12'>
          <label htmlFor='name' className='label block font-serif  w-24'>
            Full Name
          </label>
          <input
            type='text'
            name='name'
            placeholder='Jhon Doe'
            className=' text-center login-input-w py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
            required
          />
          <button
            type='submit'
            className=' bg-blue-500 text-white py-5 px-5 hover:bg-blue-600 ml-5 rounded'
          >
            Save
          </button>
        </form>

        <div className='bg-gray-200  rounded-l-md  pl-12 items-start justify-center flex flex-col h-40  '>
          <h1 className='text-2xl font-bold font-serif text-gray-600'>Email</h1>
          <p className='text-gray-400 pt-4 '>Change your email </p>
        </div>

        <form className='bg-white border flex flex-row items-center justify-start pl-12'>
          <label htmlFor='email' className='label block font-serif w-24'>
            Email
          </label>
          <input
            type='email'
            name='email'
            placeholder='example@example.com'
            className=' text-center login-input-w py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
            required
          />
          <button
            type='submit'
            className=' bg-blue-500 text-white py-5 px-5 hover:bg-blue-600 ml-5 rounded'
          >
            Save
          </button>
        </form>

        <div className='bg-gray-200  rounded-l-md  pl-12 items-start justify-center flex flex-col h-40  '>
          <h1 className='text-2xl font-bold font-serif text-gray-600'>
            Password
          </h1>
          <p className='text-gray-400 pt-4 '>
            Change your password for more security{' '}
          </p>
        </div>

        <form className='bg-white border flex flex-row items-center justify-start pl-12'>
          <label htmlFor='password' className='label block font-serif w-24'>
            Password
          </label>
          <input
            type='password'
            name='password'
            placeholder='**************************'
            className=' text-center login-input-w py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
            required
          />
          <button
            type='submit'
            className=' bg-blue-500 text-white py-5 px-5 hover:bg-blue-600 ml-5 rounded'
          >
            Save
          </button>
        </form>

        <div className='bg-gray-200  rounded-l-md  pl-12 items-start justify-center flex flex-col h-40  '>
          <h1 className='text-2xl font-bold font-serif text-gray-600'>
            Avatar
          </h1>
          <p className='text-gray-400 pt-4 '>
            change your profile picture so people can get to know you
          </p>
        </div>

        <div className='bg-white border flex flex-row items-center justify-start pl-12 '>
          <label htmlFor='photo' className='label block font-serif w-24'>
            Avatar
          </label>
          <div className='login-input-w px-3 border-gray-200 rounded-md flex flex-row items-center justify-center'>
            <img
              className=' h-32 w-64  cursor-pointer rounded'
              src={user.avatar}
              alt={user.name}
            />
          </div>

          <button className=' bg-blue-500 text-white py-5 px-5 hover:bg-blue-600 ml-5 rounded'>
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
  user: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(MyProfile);
