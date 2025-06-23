import React from 'react';

import { Alert, Spin, Card, Button, Grid } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useGetFamilyDirectoryQuery } from '../../../Redux/services/dashboard apis/familyDirectoryApis';

function FamilyDirectory() {
  const { data, isLoading, isError, error } = useGetFamilyDirectoryQuery();

  if (isError) {
    return (
      <Alert
        type="error"
        showIcon
        message={
          error?.data?.errorSources[0]?.message || 'Something went wrong'
        }
      />
    );
  }

  const handleEdit = (item) => {
    console.log('Edit clicked', item);
  };

  const handleDelete = (item) => {
    console.log('Delete clicked', item);
  };

  const handleView = (item) => {
    console.log('View clicked', item);
  };

  return (
    <Spin spinning={isLoading}>
      <div className="grid grid-cols-4 gap-2">
        {data?.data?.map((item) => (
          <div key={item._id}>
            <Card
              cover={
                <img
                  alt={item.fullName}
                  src={item.img}
                  className="w-full h-48 object-cover"
                />
              }
              actions={[
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => handleView(item)}
                />,
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(item)}
                />,
                <Button
                  type="danger"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(item)}
                />,
              ]}
            >
              <Card.Meta title={item.fullName} description={item.email} />
            </Card>
          </div>
        ))}
      </div>
    </Spin>
  );
}

export default FamilyDirectory;
