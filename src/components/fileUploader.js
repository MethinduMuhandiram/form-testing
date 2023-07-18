import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { FcOk, FcDocument } from 'react-icons/fc';
import { FaWindowClose } from 'react-icons/fa';

export default function FileUploader({ action, customText }) {
  const [fileNames, setFileNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB limit.');
      return;
    }
    action(file);
    setFileNames(acceptedFiles.map((file) => file.name));
    setErrorMessage('');
  };

  const clearFile = () => {
    action(null);
    setFileNames([]);
    setErrorMessage('');
  };

  return (
    <div className='dropZone'>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} name='file' />
            <FcDocument className='mx-auto text-3xl' />
            <p className='mb-0'>
              {errorMessage || "Drag'n'drop a file, or click to select file"}
            </p>
          </div>
        )}
      </Dropzone>

      {/* Filename */}
      <>
        {fileNames.length > 0 && (
          <strong className='flex items-center'>
            <FcOk className='me-3' /> Uploaded file:
          </strong>
        )}
        <ul style={{ listStyle: 'none' }}>
          {fileNames.map((fileName) => (
            <li key={fileName}>
              <div className={`flex items-center my-3`}>
                <p className={`mr-5 mb-0`}>- {fileName}</p>
                <button onClick={clearFile}>
                  <FaWindowClose className='text-red-400' />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
}

