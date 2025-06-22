import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { SuperAdmin } from '../../Utils/Sideber/SidebarLink';

const SideBar = () => {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});

  useEffect(() => {
    const currentPath = location.pathname;

    let activeParent = null;

    SuperAdmin.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      } else if (
        item.children &&
        item.children.some((child) => child.link === currentPath)
      ) {
        activeParent = item;
      }
    });

    if (activeParent) {
      setSelectedKey(
        activeParent.children
          ? activeParent.children.find((child) => child.link === currentPath)
              ?.key || activeParent.key
          : activeParent.key
      );

      if (activeParent.children && !expandedKeys.includes(activeParent.key)) {
        setExpandedKeys([...expandedKeys, activeParent.key]);
      }
    }
  }, []);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 mb-4">
        <img src="/logo.svg" alt="Logo" className="w-24 h-auto" />
      </div>

      {/* Scrollable menu items */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-4 space-y-1 pb-4">
          {SuperAdmin.map((item) => {
            const isActive =
              selectedKey === item.key ||
              (item.key === 'settings' &&
                item.children?.some(
                  (child) => child.link === location.pathname
                )) ||
              (item.key === 'userManagement' &&
                item.children?.some(
                  (child) => child.link === location.pathname
                )) ||
              (item.key === 'creatorManagement' &&
                item.children?.some(
                  (child) => child.link === location.pathname
                )) ||
              (item.key === 'categoriesManagement' &&
                item.children?.some(
                  (child) => child.link === location.pathname
                ));

            return (
              <div key={item.key} className="mb-1">
                <Link
                  to={item.link || '#'}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0C469D] text-white shadow-md'
                      : 'text-black hover:bg-[#0C469D]/60 hover:text-white'
                  }`}
                  onClick={(e) => {
                    if (item.children) {
                      e.preventDefault();
                      onParentClick(item.key);
                    } else {
                      setSelectedKey(item.key);
                    }
                  }}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.children && (
                    <FaChevronRight
                      className={`ml-2 transition-transform duration-200 ${
                        expandedKeys.includes(item.key)
                          ? 'transform rotate-90'
                          : ''
                      }`}
                    />
                  )}
                </Link>

                {item.children && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedKeys.includes(item.key) ? 'my-2' : 'm-0'
                    }`}
                    style={{
                      maxHeight: expandedKeys.includes(item.key)
                        ? `${contentRef.current[item.key]?.scrollHeight}px`
                        : '0',
                    }}
                    ref={(el) => (contentRef.current[item.key] = el)}
                  >
                    <div className="ml-6 pl-3 border-l-2 border-gray-600 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.key}
                          to={child.link}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                            selectedKey === child.key
                              ? 'bg-[#0C469D] text-white shadow-md'
                              : 'text-black hover:bg-[#0C469D]/60 hover:text-white'
                          }`}
                          onClick={() => {
                            setSelectedKey(child.key);
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout button at the bottom */}
      <div className="p-4 ">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium bg-[#0C469D]  rounded-lg transition-colors duration-200"
        >
          <IoIosLogOut className="w-5 !text-white h-5 mr-2" />
          <span className="text-white">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
