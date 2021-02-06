import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { useDropzone } from 'react-dropzone';
import { updateAvatar } from '../../actions/images';
import { connect } from 'react-redux';
import { showUploadAvatar, setShowSpin } from '../../actions/utils';
import { loadUser } from '../../actions/auth';
const UploadAvatar = ({
  updateAvatar,
  uploadAvatar,
  uploadAvatarError,
  loadingAvatar,
  showUpdateAvatar,
  showUploadAvatar,
  avatar,
  loadUser,
  showSpin,
  setShowSpin
}) => {
  useEffect(() => {
    showUploadAvatar('hidden');
    setShowSpin('hidden');
    loadUser();
  }, [avatar]);
  const [hide, setHide] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [files, setFiles] = useState([]);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const thumbs = files.map((file) => (
    <div key={file.name} className='mr-3'>
      <div>
        <img
          src={file.preview}
          width='100rem'
          height='100rem'
          alt='uploadedProfile'
        />
      </div>
    </div>
  ));

  useEffect(() => {
    if (uploadAvatar && !uploadAvatarError && !loadingAvatar) {
      setUploadSuccess('Upload Success');
    } else if (!uploadAvatar && uploadAvatarError && !loadingAvatar) {
      setUploadSuccess('Unable to upload');
    }
    console.log(uploadAvatar, uploadAvatarError, loadingAvatar);
  }, [uploadAvatar, uploadAvatarError, loadingAvatar]);

  const SendImage = () => {
    if (acceptedFileItems.length > 0) {
      acceptedFiles.map((file) => updateAvatar(file));
      setShowSpin('');
    } else {
      setUploadSuccess('Unable to upload');
    }
  };
  return (
    <div
      className={`absolute flex flex-col w-full items-center  h-full bg-black m-0 p-0 bg-opacity-80 ${showUpdateAvatar} z-40 `}
    >
      <div className='relative flex flex-col items-center justify-center w-full shadow-md border uploadAvatar-w bg-white upload-avatar-m'>
        <div className='flex flex-row px-3 mb-auto pt-3 border-b-2 shadow-md pb-3 w-full items-center'>
          <h1 className='text-2xl'>Select profile photo</h1>
          <i
            onClick={() => showUploadAvatar('hidden')}
            className='fas fa-times ml-auto cursor-pointer'
          ></i>
        </div>

        <div
          {...getRootProps({
            className:
              'relative flex flex-col items-center justify-center w-full h-full  border-dashed border-4 border-gray-600 '
          })}
        >
          <input {...getInputProps()} />
          <i className='fas fa-images text-gray-400 fa-5x '></i>
          <h1 className='text-3xl text-gray-400 mt-3'>
            Drag a profile photo here
          </h1>
          <div className='absolute bottom-0 mb-5 text-center flex flex-row justify-center items-center'>
            {thumbs}
            <div className='flex flex-col'>
              <ul>{acceptedFileItems}</ul>
              <ul>{fileRejectionItems}</ul>
              <ul className={`${showSpin}`}>{uploadSuccess}</ul>
            </div>
            <div className={`ml-3 ${showSpin}`}>
              <i className='fas fa-spinner spin'></i>
            </div>
          </div>
        </div>

        <div className='flex flex-row w-full pl-5 py-2 border-t-2'>
          <button
            className='mr-3 text-white bg-blue-400 hover:bg-blue-500 rounded px-2 py-1'
            onClick={() => SendImage()}
          >
            Set as profile photo
          </button>
          <button
            className='bg-gray-200 hover:bg-gray-300 rounded px-2 py-1'
            onClick={() => showUploadAvatar('hidden')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

UploadAvatar.propTypes = {
  updateAvatar: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.bool.isRequired,
  uploadAvatarError: PropTypes.string.isRequired,
  loadingAvatar: PropTypes.bool.isRequired,
  showUploadAvatar: PropTypes.func.isRequired,
  showUpdateAvatar: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  loadUser: PropTypes.func.isRequired,
  showSpin: PropTypes.string.isRequired,
  setShowSpin: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  uploadAvatar: state.image.uploadAvatar,
  uploadAvatarError: state.image.error,
  loadingAvatar: state.image.loadingAvatar,
  showUpdateAvatar: state.util.showUploadAvatar,
  avatar: state.image.avatar,
  showSpin: state.util.showSpin
});
export default connect(mapStateToProps, {
  updateAvatar,
  showUploadAvatar,
  loadUser,
  setShowSpin
})(UploadAvatar);
