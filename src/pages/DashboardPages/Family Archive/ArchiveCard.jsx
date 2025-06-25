import React from 'react';
import { Button, Card, Popconfirm } from 'antd';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { imageUrl } from '../../../Utils/server';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';

const ArchiveCard = ({ item, onEdit, onDelete }) => {
  console.log(item);
  return (
    <Card
      className="h-full flex flex-col rounded-lg overflow-hidden hover:shadow-md"
      cover={
        <img
          src={imageUrl(item?.img)}
          alt={item?.title}
          className="w-full max-h-[180px] h-full object-cover object-top"
        />
      }
      actions={[
        <Button type="text" icon={<FaEdit />} onClick={() => onEdit(item)} />,
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => onDelete(item?._id)}
        >
          <Button type="text" icon={<FaTrash />} danger />
        </Popconfirm>,
        <Link
          to={`/family-archive/${item?._id}`}
          state={{ id: item?._id, title: item?.title }}
        >
          <Button
            type="text"
            icon={<GoArrowUpRight />}
            className="!flex !w-full !items-center !justify-center"
          />
        </Link>,
      ]}
    >
      <Card.Meta title={item?.title} description={item?.description} />
    </Card>
  );
};

export default ArchiveCard;
