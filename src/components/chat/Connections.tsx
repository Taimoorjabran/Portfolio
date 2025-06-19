'use client';

import React from 'react';
import Image from 'next/image';

type User = {
  _id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
};

export default function Connections({ users }: { users: User[] }) {
  return (
    <div className="bg-white p-6 mb-4 rounded-lg shadow-md border border-gray-100 max-h-[218px] overflow-y-auto custom-scrollbar">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Your <span className="text-blue-600">Connections</span>
      </h2>
      {users.length === 0 ? (
        <p className="text-gray-500 italic text-center py-4">No connections found.</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user._id}
              className="flex items-center space-x-4 bg-gray-50 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200 ease-in-out cursor-pointer group"
            >
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name || user.email}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-blue-400 group-hover:border-blue-600 transition-colors duration-200"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 border-2 border-blue-300 group-hover:border-blue-500 transition-colors duration-200">
                  {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                  {user.name || 'No Name Provided'}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button
                className="ml-auto p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="View Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}