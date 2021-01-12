import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Login = ({ login, error, isAuthenticated }) => {
  const [alert, setAlert] = useState('hidden');

  useEffect(() => {
    if (error) {
      setAlert('');
    } else {
      setAlert('hidden');
    }
  }, [error]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    login(email, password);
  };

  return (
    <div className='flex flex-col items-center bg-photo h-screen'>
      <div className='transparentCover'></div>
      <div className='flex flex-row  shadow-md bg-white  px-2 py-3 mt-0 border-b-2  w-full justify-center items-center '>
        <div className='absolute flex flex-row items-center'>
          <i className='fas fa-camera-retro text-blue-500 fa-3x mr-2'></i>
          <h1 className='title2 font-bold'>Shared Photos </h1>
        </div>

        <p className='ml-auto mr-2'>
          Don't have a account ?{' '}
          <Link to='/register' className='ml-2'>
            <button className='bg-gray-200  px-4 py-2 rounded hover:bg-gray-400 hover:text-white'>
              Sign Up
            </button>
          </Link>
        </p>
      </div>
      <div className='mt-auto mb-auto flex flex-col items-center justify-center mb-20 bg-white border-solid  border-gray-300 rounded-md  shadow-lg '>
        <div className=' flex flex-col justify-center pt-5 px-12 pb-5 items-center '>
          <span
            className={`rounded login-input-w mt-2 text-center py-3 ${alert} bg-red-300 font-semibold`}
          >
            {error}
          </span>
          <h1 className='title1 mt-3'>
            <i className='fas fa-user'></i> Sign In
          </h1>
          <form
            className='flex flex-col items-center'
            onSubmit={(e) => onSubmit(e)}
          >
            <div className='my-3 w-full'>
              <label htmlFor='email' className='label block'>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                value={email}
                placeholder='example@example.com'
                className=' text-center login-input-w py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
                onChange={(e) => onChange(e)}
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
                className='login-input-w text-center  py-5 px-3 border-solid border-2 border-gray-200 rounded-md'
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div className='mt-5'>
              <button
                type='submit'
                className='login-input-w bg-blue-500 text-white py-5 px-5 hover:bg-blue-600 '
              >
                Sign In <i className='fas fa-sign-in-alt'></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.errors.loginError
});

export default connect(mapStateToProps, { login })(Login);
