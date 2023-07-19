import React, { useState } from "react"
import { Button } from "react-bootstrap"
import Dropzone from "react-dropzone"
import { FcOk, FcDocument } from "react-icons/fc"
import { FaWindowClose } from "react-icons/fa"

export default function FileUploader({ action, customText }) {
  const [fileNames, setFileNames] = useState([])
  const handleDrop = acceptedFiles => {
    action(acceptedFiles[0])
    return setFileNames(acceptedFiles.map(file => file.name))
  }
  const clearFile = () => {
    action(null)
    return setFileNames([])
  }

  return (
    <div className="dropZone">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} name="file" />
            <FcDocument className="h1" />
            <p className="mb-0">Drag'n'drop a file, or click to select file</p>
          </div>
        )}
      </Dropzone>

      {/* Filename */}
      <>
        {fileNames.length > 0 && (
          <strong className="d-flex align-items-center">
            <FcOk className="me-3" /> Uploaded file:
          </strong>
        )}
        <ul style={{ listStyle: "none" }}>
          {fileNames.map(fileName => (
            <li key={fileName}>
              <div className={`d-flex align-items-center my-3`}>
                <p className={`me-5 mb-0`}>- {fileName}</p>
                <Button variant="" onClick={clearFile}>
                  <FaWindowClose color="danger" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </>
    </div>
  )
}
