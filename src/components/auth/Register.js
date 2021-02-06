import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';

const Register = ({ register, error }) => {
  const [alert, setAlert] = useState('hidden');

  useEffect(() => {
    if (error) {
      setAlert('');
    } else {
      setAlert('hidden');
    }
  }, [error]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    verifyPassword: ''
  });

  const { name, email, password, verifyPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, verifyPassword);
    register(name, email, password, verifyPassword);
  };

  return (
    <div className='flex flex-col items-center bg-photo '>
      <div className='flex flex-row mb-16  bg-white border-solid px-2 py-3 mt-0 shadow-md w-full justify-center items-center'>
        <div className='absolute flex flex-row items-center'>
          <i className='fas fa-camera-retro text-blue-500 fa-3x mr-2'></i>
          <h1 className='title2 font-bold'>
            <span className='text-blue-500'>Shared</span> Photos{' '}
          </h1>
        </div>

        <p className='ml-auto mr-2'>
          Have a account ?{' '}
          <Link to='/login' className='ml-2'>
            <button className='bg-gray-200  px-4 py-2 rounded hover:bg-gray-400 hover:text-white'>
              Sign In
            </button>
          </Link>
        </p>
      </div>
      <div className='flex flex-col items-center justify-center mb-20 bg-white border-solid  border-gray-300 rounded-md  shadow-lg '>
        <div className=' flex flex-col justify-center px-12 py-5 pt-5 items-center '>
          <span
            className={`rounded login-input-w mt-2 text-center py-3 ${alert} bg-red-300 font-semibold`}
          >
            {error}
          </span>

          <h1 className='title1'>
            <i className='fas fa-user'></i> Sign Up
          </h1>

          <form
            onSubmit={(e) => onSubmit(e)}
            className='flex flex-col items-center'
          >
            <div className='my-3 w-full'>
              <label htmlFor='name' className='label block'>
                Full Name
              </label>
              <input
                type='text'
                name='name'
                value={name}
                placeholder='Jhon Doe'
                onChange={(e) => onChange(e)}
                className=' text-center login-input-w py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
                required
              />
            </div>

            <div className='my-3 w-full'>
              <label htmlFor='email' className='label block'>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                value={email}
                placeholder='example@example.com'
                onChange={(e) => onChange(e)}
                className=' text-center login-input-w py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
                required
              />
            </div>

            <div className='my-3 mb-2'>
              <label htmlFor='password' className='label block'>
                Password
              </label>
              <input
                type='password'
                name='password'
                value={password}
                placeholder='**************************'
                onChange={(e) => onChange(e)}
                className='login-input-w text-center  py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
                required
              />
            </div>

            <div className='my-3 mb-2'>
              <label htmlFor='verifyPassword' className='label block'>
                Verify Password
              </label>
              <input
                type='password'
                name='verifyPassword'
                value={verifyPassword}
                placeholder='**************************'
                onChange={(e) => onChange(e)}
                className='login-input-w text-center  py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
                required
              />
            </div>

            <div className='my-5'>
              <button
                type='submit'
                className='login-input-w bg-blue-500 text-white py-5 px-5 hover:bg-blue-600'
              >
                Sign Up <i className='fas fa-sign-in-alt'></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  error: state.auth.errors.registerError
});
export default connect(mapStateToProps, { register })(Register);
