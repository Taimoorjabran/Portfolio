'use client';
import { useState } from 'react';
import { format } from 'date-fns';

type ChatMessage = {
  sender: string;
  message: string;
  timestamp: string;
};

interface ChatListProps {
  recruiterChats: ChatMessage[];
  userChats: ChatMessage[];
  role: string;
}

export default function ChatList({ recruiterChats, userChats, role }: ChatListProps) {
  const isAdmin = role === 'admin';
  const [activeTab, setActiveTab] = useState<'recruiters' | 'users'>(isAdmin ? 'recruiters' : 'users');

  const messages = activeTab === 'recruiters' ? recruiterChats : userChats;
  const userText = isAdmin ? 'Recent' : 'Your';

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 max-h-[350px] flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        {userText} <span className="text-blue-600">Messages List</span>
      </h2>

      {isAdmin && (
        <div className="flex space-x-3 mb-6 p-1 bg-gray-100 rounded-lg shadow-inner">
          <button
            onClick={() => setActiveTab('recruiters')}
            className={`flex-1 py-3 px-4 rounded-md text-base font-semibold transition-all duration-300 ease-in-out
              ${activeTab === 'recruiters'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-200'
              }`}
          >
            Recruiter Messages
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 px-4 rounded-md text-base font-semibold transition-all duration-300 ease-in-out
             ${activeTab === 'users'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-200'
              }`}
          >
            User Messages
          </button>
        </div>
      )}

      <div className="flex-1 space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-y-auto custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-500 italic">No messages found for this category.</p>
          </div>
        ) : (
          messages.map((chat, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-1">
                <p className="text-base font-semibold text-gray-800">
                  {chat.sender}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(chat.timestamp), 'dd/MM/yyyy')} at {format(new Date(chat.timestamp), 'HH:mm')}
                </p>
              </div>
              <p className="text-sm text-gray-700 break-words leading-relaxed">
                {chat.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}