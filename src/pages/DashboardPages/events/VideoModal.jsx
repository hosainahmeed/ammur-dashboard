import { Modal } from 'antd';
import React from 'react';

export default function VideoModal({ open, onClose, videoUrl }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnClose
    >
      {videoUrl && (
        <video src={videoUrl} controls className="w-full" autoPlay />
      )}
    </Modal>
  );
}
