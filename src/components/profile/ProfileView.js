import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { getProfile } from '../../actions/profiles';
import { resetPage, setPage } from '../../actions/utils';
import { connect } from 'react-redux';
import UploadAvatar from '../images/UploadAvatar';
import UploadImage from '../images/UploadImage';
import imageLoading from '../../img/loading.gif';
const ProfileView = ({
  match,
  profile: { user, images, lastImage },
  getProfile,
  loading,
  resetPage,
  page,
  setPage
}) => {
  var checkLastImage = '';
  useEffect(() => {
    resetPage();
    getProfile(match.params.id, 1);
    console.log('pase por aqui');
  }, [getProfile, match.params.id, resetPage]);

  useEffect(() => {
    getProfile(match.params.id, page);
    console.log(lastImage, 'es este');
  }, [page]);

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
  return loading ? (
    <div className='flex items-center justify-center h-screen'>
      <img src={imageLoading} alt='loading' width='100rem' />
    </div>
  ) : (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <UploadAvatar />
      <UploadImage />
      <div className='flex justify-center items-center mt-12'>
        <img
          src={user.avatar}
          alt={user.name}
          className='rounded-full w-36 h-36 mr-4 object-cover'
        />

        <h1 className='profile-name text-4xl'>{`${user.name}`}</h1>
      </div>
      <div className='flex flex-col w-64 items-start'>
        <h3 className='mt-12 ml-2 mb-0 font-semibold text-gray-500 border-b-2 border-blue-500'>{`${user.name}'s photo collection`}</h3>
      </div>

      <div className='flex flex-wrap'>
        {images.map((image) => (
          <img
            src={image.src}
            alt=''
            className='min-width mt-1 mx-1 object-cover'
          />
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

ProfileView.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  resetPage: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  page: state.util.page
});

export default connect(mapStateToProps, { getProfile, resetPage, setPage })(
  ProfileView
);
