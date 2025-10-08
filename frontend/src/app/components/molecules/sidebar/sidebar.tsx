'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  active?: boolean;
  badge?: string | number;
}

export interface SidebarProps {
  /** Sidebar items */
  items: SidebarItem[];
  /** Whether sidebar is collapsed */
  collapsed: boolean;
  /** Toggle sidebar collapse */
  onToggleCollapseAction: () => void;
  /** Handle item click */
  onItemClickAction?: (item: SidebarItem) => void;
  /** Active item ID */
  activeItemId?: string;
  /** Custom className */
  className?: string;
  /** User info */
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  collapsed,
  onToggleCollapseAction,
  onItemClickAction,
  activeItemId,
  className,
  userInfo,
}) => {
  return (
    <div
      className={cn(
        'bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#499537] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl text-gray-900">SevaLanka</span>
            </div>
          )}
          <button
            onClick={onToggleCollapseAction}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className={cn(
                'w-5 h-5 text-gray-600 transition-transform duration-200',
                collapsed ? 'rotate-180' : ''
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* User Info */}
      {userInfo && !collapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#499537] rounded-full flex items-center justify-center">
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar}
                  alt={userInfo.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-medium text-sm">
                  {userInfo.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {userInfo.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userInfo.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 py-4">
        <div className="space-y-1 px-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClickAction?.(item)}
              className={cn(
                'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group',
                activeItemId === item.id
                  ? 'bg-[#499537] text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              {!collapsed && (
                <>
                  <span className="ml-3 flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        'ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full',
                        activeItemId === item.id
                          ? 'bg-white text-[#499537]'
                          : 'bg-[#499537] text-white'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!collapsed && (
          <div className="text-xs text-gray-500 text-center">
            © 2024 SevaLanka
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;