import React from 'react';
import { Upload, message } from 'antd';
import { FaUpload } from 'react-icons/fa';

const { Dragger } = Upload;

const UploadPreview = ({
  type = 'image',
  fileList,
  previewUrl,
  setFileList,
  setPreviewUrl,
  label,
}) => {
  const isImage = type === 'image';
  const accept = isImage ? 'image/*' : 'video/*';

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
      setPreviewUrl('');
    },
    beforeUpload: (file) => {
      if (!file.type.startsWith(type)) {
        message.error(`You can only upload ${type} files!`);
        return Upload.LIST_IGNORE;
      }

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      setFileList([
        {
          ...file,
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: preview,
          originFileObj: file,
        },
      ]);

      return false;
    },
    fileList,
    maxCount: 1,
  };

  return (
    <>
      <label className="font-medium block mb-2">{label}</label>
      <Dragger {...uploadProps} accept={accept} className="!p-4 !border-dashed">
        <p className="ant-upload-drag-icon">
          <FaUpload className="text-gray-400 text-2xl" />
        </p>
        <p className="ant-upload-text">
          Click or drag {type} file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for a single file</p>
      </Dragger>

      {previewUrl && (
        <div className="mt-4">
          <h4 className="mb-2 text-sm font-medium text-gray-700">Preview:</h4>
          <div
            className={`w-full ${
              isImage ? 'h-40' : 'h-56'
            } border rounded overflow-hidden`}
          >
            {isImage ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={previewUrl}
                controls
                className="w-full h-full object-contain bg-black"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UploadPreview;
