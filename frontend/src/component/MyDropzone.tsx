import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { MdClose, MdUploadFile } from 'react-icons/md'


interface MyDropzoneProps {
  onFileSelect:(file:File | null)=>void;
  selectedFile: File | null;
}


function MyDropzone({onFileSelect,selectedFile}:MyDropzoneProps) {
  const onDrop = useCallback((acceptedFiles:File[] )=> {
    if(acceptedFiles.length>0){
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept:{
      'application/pdf':['.pdf'],
      'application/msword':['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':['.docx']
    },
    maxFiles:1
  
  })

  const removeFile = (e:React.MouseEvent)=>{
    e.stopPropagation();
    onFileSelect(null);
  }

  return (
    <div {...getRootProps()} className=''>
      <input {...getInputProps()} />
      {selectedFile ? (
        // Show selected file
        <div className='w-full flex flex-col items-center gap-2'>
          <div className='flex items-center gap-2 bg-gray-700 rounded-lg p-3 w-full'>
            <MdUploadFile className='text-green-500 text-xl' />
            <span className='text-white flex-1 truncate'>{selectedFile.name}</span>
            <button 
              onClick={removeFile}
              className='text-red-500 hover:text-red-400 text-xl'
            >
              <MdClose />
            </button>
          </div>
          <p className='text-green-400 text-sm'>File selected successfully!</p>
        </div>
      ) : (
        // Show dropzone
        <>
          <div className='w-full flex justify-center text-4xl my-2'>
            <MdUploadFile />
          </div>
          {
            isDragActive ?
              <p className='text-white text-center font-semibold'>Drop the files here ...</p> :
              <p className='text-white text-center font-semibold'>Drag 'n' drop resume here, or click to select files</p>
          }
          <p className='text-gray-500 text-xs mt-2'>Supports: PDF, DOC, DOCX</p>
        </>
      )}
    </div>
  )
}

export default MyDropzone