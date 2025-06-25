import React from 'react';
import ArchiveCard from './ArchiveCard';

const ArchiveGrid = ({
  data,
  onEdit,
  onDelete,
}) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((item) => (
        <ArchiveCard
          key={item._id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ArchiveGrid;
