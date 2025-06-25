import React, { useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import {
  FaBell,
  FaStar,
  FaBullhorn,
  FaDollarSign,
  FaShoppingCart,
  FaTruck,
  FaUser,
} from 'react-icons/fa';
import { CiSettings } from 'react-icons/ci';
import { Button, Card, Spin, Badge } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  useGetNotificationQuery,
  useMarkAsReadMutation,
} from '../../../Redux/services/dashboard apis/notificationApis';
import toast from 'react-hot-toast';

const AllNotificationPage = () => {
  const location = useLocation();
  const { userId, role } = location.state;
  const { data, isLoading, error } = useGetNotificationQuery({ userId, role });
  const [markAsReadApis, { isLoading: markAsReadLoading }] =
    useMarkAsReadMutation();
  const notifications = useMemo(() => data?.data || [], [data]);

  const renderIcon = useCallback((type) => {
    switch (type) {
      case 'newRequest':
        return <FaUser />;
      case 'newLegacy':
        return <FaStar />;
      case 'newArchive':
        return <FaBullhorn />;
      case 'newFamily':
        return <FaDollarSign />;
      case 'newEvent':
        return <FaShoppingCart />;
      case 'newRecipe':
        return <FaTruck />;
      case 'newAdmin':
        return <FaBell />;
      default:
        return <CiSettings />;
    }
  }, []);

  const formatTime = useCallback((dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }, []);

  const NotificationItem = React.memo(({ index, style }) => {
    const item = notifications[index];

    return (
      <div style={style}>
        <div
          className={`px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
            !item.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`text-xl flex-shrink-0 ${
                !item.isRead ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {renderIcon(item.type)}
            </div>

            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className={`font-medium truncate ${
                    !item.isRead ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  {item.title}
                </h3>
                {!item.isRead && (
                  <Badge size="small" color="blue" className="flex-shrink-0" />
                )}
              </div>

              <p
                className={`text-sm line-clamp-2 mb-2 ${
                  !item.isRead ? 'text-gray-700' : 'text-gray-500'
                }`}
              >
                {item.message}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {formatTime(item.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-2">
            Error fetching notifications
          </p>
          <p className="text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }
  const markAsRead = async (id) => {
    const data = {
      userId: userId,
    };
    try {
      await markAsReadApis({ id, data })
        .unwrap()
        .then((res) => {
          if (res?.success) {
          toast.success(res?.message || 'Notification marked as read');
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to mark notification as read');
    }
  };
  return (
    <Spin spinning={isLoading}>
      <div className="h-screen flex flex-col">
        <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-gray-900">
                Notifications
              </h1>
              {data?.meta?.unreadCount > 0 && (
                <Badge
                  count={data.meta.unreadCount}
                  className="bg-blue-500"
                  overflowCount={999}
                />
              )}
            </div>
            <Button
              size="small"
              type="link"
              className="text-blue-500 hover:text-blue-600 p-0 h-auto"
              onClick={() => markAsRead(userId)}
            >
              {markAsReadLoading ? 'Marking as read...' : 'Mark as read'}
            </Button>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            {data?.meta?.total || 0} total notifications
            {data?.meta?.unreadCount > 0 && (
              <span className="ml-2 text-blue-600">
                • {data.meta.unreadCount} unread
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 bg-white">
          <Card className="h-full border-0 rounded-none">
            {notifications.length > 0 ? (
              <List
                height={window.innerHeight - 200}
                itemCount={notifications.length}
                itemSize={120}
                className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                {NotificationItem}
              </List>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <FaBell className="text-4xl mb-4 text-gray-300" />
                <p>No notifications found</p>
              </div>
            )}
          </Card>
        </div>

        {data?.meta?.totalPage > data?.meta?.page && (
          <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white text-center">
            <Button type="link" className="text-blue-500 hover:text-blue-600">
              Load more notifications
            </Button>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default AllNotificationPage;
