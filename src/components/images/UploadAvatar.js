import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { useDropzone } from 'react-dropzone';
import { updateAvatar } from '../../actions/images';
import { connect } from 'react-redux';
const UploadAvatar = ({ updateAvatar }) => {
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

  const SendImage = () => {
    if (acceptedFileItems.length > 0) {
      acceptedFiles.map((file) => updateAvatar(file));
    } else {
      console.log('no hay nada');
    }
  };
  return (
    <div className='relative flex flex-col w-full items-center justify-center h-screen bg-transparent m-0 p-0'>
      <div className='relative flex flex-col items-center justify-center w-full shadow-md border uploadAvatar-w'>
        <div className='flex flex-row px-3 mb-auto pt-3 border-b-2 shadow-md pb-3 w-full items-center'>
          <h1 className='text-2xl'>Select profile photo</h1>
          <i className='fas fa-times ml-auto'></i>
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
          <button className='bg-gray-200 hover:bg-gray-300 rounded px-2 py-1'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

UploadAvatar.propTypes = { updateAvatar: PropTypes.func.isRequired };
export default connect(null, { updateAvatar })(UploadAvatar);
