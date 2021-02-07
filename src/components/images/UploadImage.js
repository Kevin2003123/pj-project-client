import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { showUploadImage } from '../../actions/utils';
import { uploadImage } from '../../actions/images';
import { connect } from 'react-redux';
const UploadImage = ({
  showUploadImage,
  showWindow,
  user,
  uploadImage,
  page,
  search,
  imageUpload,
  imageUploadError
}) => {
  const [form, setForm] = useState({ image_name: '', image_description: '' });
  const [uploadSuccess, setUploadSuccess] = useState('');
  const { image_name, image_description } = form;
  const [files, setFiles] = useState([]);
  const [hideWindow, setHideWindow] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [showSpin, setShowSpin] = useState('hidden');

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setShowSpin('');
    if (acceptedFileItems.length > 0) {
      acceptedFiles.map((file) =>
        uploadImage(file, image_name, image_description)
      );
    } else {
      setUploadSuccess('Please upload a image');
      setDisabled(false);
      setShowSpin('hidden');
    }
  };

  useEffect(() => {
    setDisabled(false);
    setShowSpin('hidden');
  }, [imageUpload, imageUploadError]);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );

      setUploadSuccess('');
    }
  });

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

  return (
    <div
      className={`absolute bg-black flex  justify-center bg-opacity-50 w-full h-full ${showWindow} z-40`}
    >
      <div className='bg-white flex flex-col upload-w profile-name rounded upload-avatar-m'>
        <div className='flex items-center py-3'>
          <h1 className=' mr-auto ml-4 text-2xl'>
            <span className='text-blue-600'>Upload</span> Image
          </h1>
          <i
            className='fas fa-times mr-3 cursor-pointer'
            onClick={() => showUploadImage('hidden')}
          ></i>
        </div>
        <hr className='w-full' />
        <form className='grid grid-area w-full ' onSubmit={(e) => onSubmit(e)}>
          <div className='image-name self-center ml-3'>
            <label htmlFor='image_name' className='text-lg text-gray-700'>
              Name
            </label>
            <input
              type='text'
              name='image_name'
              id='image_name'
              placeholder='Image Name'
              className='border-2 ml-4 p-3 rounded'
              required
              onChange={(e) => onChange(e)}
              value={image_name}
            />
          </div>

          <div className='image-description ml-3'>
            <label
              htmlFor='image_description'
              className='text-lg text-gray-700'
            >
              Description
            </label>
            <textarea
              name='image_description'
              id='image_description'
              cols='50'
              rows='8'
              className='border-2 block rounded mt-3 mr-3 pl-3 pt-3'
              required
              placeholder='Insert a description of the image'
              onChange={(e) => onChange(e)}
              value={image_description}
            />
          </div>

          <div className=' flex relative container border-4 border-dashed drop-image items-center justify-center '>
            <div
              {...getRootProps({
                className: 'dropzone relative h-full w-full z-10 cursor-pointer'
              })}
            >
              <input {...getInputProps()} />
            </div>
            <div className='flex flex-col absolute items-center z-0 drop-mes'>
              <div className=''>
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only *.jpeg and *.png images will be accepted)</em>
              </div>
              <div className='flex items-center justify-center mt-4'>
                {thumbs}
                <div className='flex flex-col items-center justify-center'>
                  <ul>{acceptedFileItems}</ul>

                  <ul>{fileRejectionItems}</ul>
                  <ul className='text-red-500'>{uploadSuccess}</ul>
                </div>
                <div className={`ml-3 ${showSpin}`}>
                  <i className='fas fa-spinner spin'></i>
                </div>
              </div>
            </div>
          </div>

          <div className='flex send-upload border-t-2  text-lg py-3'>
            {disabled ? (
              <input
                type='button'
                value='Upload'
                className={`ml-auto mr-3 rounded py-1 px-4 bg-blue-200 text-white  cursor-text`}
              />
            ) : (
              <input
                type='submit'
                value='Upload'
                className={`ml-auto mr-3 rounded py-1 px-4 bg-blue-400 text-white hover:bg-blue-600 cursor-pointer`}
              />
            )}

            <input
              type='button'
              value='Cancel'
              className='rounded mr-4 py-1 px-4 hover:bg-gray-500 cursor-pointer'
              onClick={() => showUploadImage('hidden')}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

UploadImage.propTypes = {
  showWindow: PropTypes.string.isRequired,
  showUploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
  imageUpload: PropTypes.object.isRequired,
  imageUploadError: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
  showWindow: state.util.showUploadImageWindow,
  user: state.auth.user,
  page: state.util.page,
  search: state.util.search,
  imageUpload: state.image.imageUpload,
  imageUploadError: state.image.imageUploadError
});

export default connect(mapStateToProps, {
  showUploadImage,
  uploadImage
})(UploadImage);
