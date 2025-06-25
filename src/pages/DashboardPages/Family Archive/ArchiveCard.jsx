import React from 'react';
import { Button, Card, Popconfirm } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { imageUrl } from '../../../Utils/server';

const ArchiveCard = ({ item, onEdit, onDelete }) => {
  console.log(item)
  return (
    <Card
      className="h-full flex flex-col rounded-lg overflow-hidden hover:shadow-md"
      cover={
        <img
          src={imageUrl(item.img)}
          alt={item.title}
          className="w-full h-full object-cover"
        />
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

export default ArchiveCard;
