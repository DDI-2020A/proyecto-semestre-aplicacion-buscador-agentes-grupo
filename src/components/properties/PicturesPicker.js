import React, { useState } from 'react'
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";


const PicturesPicker = () => {
  const dispatch = useDispatch();
  const { files } = useSelector(state => state);

  const setFiles = files => dispatch({ type: "LOAD_FILES", payload: files });
  const setUploading = uploading => dispatch({ type: 'UPLOADING', payload: uploading });

  const remove = file => {
    setFiles(
      files.filter(item => item != file)
    );
  }

  const props = {
    onRemove: remove,
    beforeUpload: file => {
      setFiles([...files, file]);
      console.log(files);
      return false;
    },
    fileList: files,
  };

  const root = {
    minWidth:50
  }

  const content = {
    margin: '0 auto'
  }

  return (
    <Upload {...props}>
      <Button style={root} icon={<UploadOutlined />}></Button>
    </Upload>
  );
}
export default PicturesPicker;
