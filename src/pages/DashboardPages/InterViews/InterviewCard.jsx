import React from 'react';
import { Button, Card, Popconfirm } from 'antd';
import { FaEdit, FaTrash, FaPlay, FaPause } from 'react-icons/fa';
import { imageUrl } from '../../../Utils/server';

const InterviewCard = ({
  item,
  hoveredId,
  setHoveredId,
  videoRefs,
  isVideoPlaying,
  setIsVideoPlaying,
  onEdit,
  onDelete,
}) => {
  const handleMouseEnter = () => {
    setHoveredId(item._id);
    const video = videoRefs.current[item._id];
    if (video) {
      video.play().catch(console.log);
      setIsVideoPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    const video = videoRefs.current[item._id];
    if (video) {
      video.pause();
      video.currentTime = 0;
      setIsVideoPlaying(false);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    const video = videoRefs.current[item._id];
    if (video) {
      video.paused ? video.play() : video.pause();
      setIsVideoPlaying(!video.paused);
    }
  };

  return (
    <Card
      className="h-full flex flex-col rounded-lg overflow-hidden hover:shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cover={
        <div className="relative h-[180px] cursor-pointer">
          {hoveredId === item._id && item.video ? (
            <div className="relative h-full w-full">
              <video
                ref={(el) => (videoRefs.current[item._id] = el)}
                src={item.video}
                className="h-full w-full object-cover"
                muted
                loop
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                onClick={togglePlay}
              >
                <button className="p-3 bg-white bg-opacity-70 rounded-full text-blue-600 hover:bg-opacity-90">
                  {isVideoPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={imageUrl(item.img)}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
            {item.duration}
          </div>
        </div>
      }
      actions={[
        <Button type="text" icon={<FaEdit />} onClick={() => onEdit(item)} />,
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => onDelete(item._id)}
        >
          <Button type="text" icon={<FaTrash />} danger />
        </Popconfirm>,
      ]}
    >
      <Card.Meta title={item.title} description={item.description} />
    </Card>
  );
};

export default InterviewCard;
