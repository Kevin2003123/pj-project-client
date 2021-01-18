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

const Photos = ({
  isAuthenticated,
  user,
  getImages,
  images: { images, lastImage },
  page,
  setPage,
  search,
  setSearch
}) => {
  useEffect(() => {
    getImages(page, search);
  }, [getImages, page, search]);

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
    <div className='flex flex-col relative z-30 h-screen '>
      <Navbar />

      <UploadAvatar />
      <div className='relative flex flex-wrap justify-center py-12 '>
        {images.map((image) => (
          <ImageItems image={image} key={uuidv4()} />
        ))}
      </div>
      <nav className='flex flex-row bg-white shadow-md w-64 mx-auto justify-center rounded-full border bg-gray-300 mb-4 font-semibold '>
        {page > 1 ? (
          <div
            onClick={() => preview()}
            className='mr-auto cursor-pointer w-24 text-center border-r-2 border-white rounded-l-full hover:bg-gray-400'
          >
            Previews
          </div>
        ) : (
          <div
            onClick={() => preview()}
            className='mr-auto  w-24 text-center border-r-2 border-white rounded-l-full text-white'
          >
            Previews
          </div>
        )}

        <div className='text-blue-900'>{page}</div>
        {images.some((image) => image.id === lastImage) ? (
          <div className='ml-auto w-24 text-center border-l-2 border-white rounded-r-full text-white'>
            Next
          </div>
        ) : (
          <div
            onClick={() => next()}
            className='ml-auto cursor-pointer w-24 text-center border-l-2 border-white rounded-r-full  hover:bg-gray-400'
          >
            Next
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
  setSearch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  images: state.image.images,
  page: state.util.page,
  search: state.util.search
});
export default connect(mapStateToProps, { getImages, setPage, setSearch })(
  Photos
);
