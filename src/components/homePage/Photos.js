import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import UploadAvatar from '../images/UploadAvatar';
import Footer from '../layout/Footer';
import { getImages } from '../../actions/images';
import ImageItems from '../images/ImageItems';
import { v4 as uuidv4 } from 'uuid';
import Gallery from 'react-photo-gallery';
import { setPage, setSearch } from '../../actions/utils';
import { Link } from 'react-router-dom';
import UploadImage from '../images/UploadImage';

const Photos = ({
  isAuthenticated,
  user,
  getImages,
  images: { images, lastImage },
  page,
  setPage,
  search,
  setSearch,
  imageUpload
}) => {
  useEffect(() => {
    getImages(page, search);
  }, [getImages, page, search, imageUpload]);

  useEffect(() => {
    isAuthenticated ? setShow('hidden') : setShow('');
  }, [isAuthenticated]);

  const [show, setShow] = useState('');

  const preview = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = () => {
    if (images.some((image) => image.id !== lastImage) || images.length > 0) {
      console.log(page);
      setPage(page + 1);
    }
  };

  return (
    <div className='flex flex-col relative z-30 h-full w-full'>
      <Navbar />

      <UploadAvatar />
      <UploadImage />
      <div className='flex flex-row relative items-center justify-center '>
        <img
          src='https://source.unsplash.com/1600x900/?nature'
          alt='Random nature'
          className='h-screen-landing-img'
        />
        <div className='absolute -mt-12 z-20'>
          <h1 className=' text-white  text-4xl font-semibold title  text-center mb-4'>
            The best photos shared by talented creators
          </h1>
          <div className='flex flex-row justify-center'>
            <Link to='/login'>
              <button
                className={`bg-gray-300  px-4 py-2 rounded hover:bg-gray-400 hover:text-white  mr-7 profile-name ${show}`}
              >
                Sign In
              </button>
            </Link>
            <Link to='/register'>
              <button
                className={`bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 hover:text-white   profile-name ${show}`}
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        <div className='transparentCover z-10'></div>
      </div>
      <div className='relative flex flex-wrap '>
        {images.map((image) => (
          <ImageItems image={image} key={uuidv4()} />
        ))}
      </div>
      <nav className='flex flex-row bg-white shadow-md w-64 mx-auto justify-center rounded-full border bg-blue-500 mb-4 font-bold text-white mt-4'>
        {page > 1 ? (
          <div
            onClick={() => preview()}
            className='mr-auto cursor-pointer w-24 text-center border-r-2 border-white rounded-l-full hover:bg-blue-600'
          >
            <i class='fas fa-chevron-left'></i>
          </div>
        ) : (
          <div className='mr-auto  w-24 text-center border-r-2 border-white rounded-l-full text-white'></div>
        )}

        <div className='text-white font-bold'>{page}</div>
        {images.some((image) => image.id === lastImage) ? (
          <div className='ml-auto w-24 text-center border-l-2 border-white rounded-r-full text-white'></div>
        ) : (
          <div
            onClick={() => next()}
            className='ml-auto cursor-pointer w-24 text-center border-l-2 border-white rounded-r-full  hover:bg-blue-600'
          >
            <i class='fas fa-chevron-right'></i>
          </div>
        )}
      </nav>

      <Footer />
    </div>
  );
};

Photos.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  getImages: PropTypes.func.isRequired,
  images: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  imageUpload: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  images: state.image.images,
  page: state.util.page,
  search: state.util.search,
  imageUpload: state.image.imageUpload
});
export default connect(mapStateToProps, { getImages, setPage, setSearch })(
  Photos
);
