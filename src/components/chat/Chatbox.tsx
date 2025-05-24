'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

interface Message {
  sender: string;
  recipient: string;
  message: string;
  timestamp: string;
  _id?: string;
}

interface User {
  email: string;
  name?: string;
  avatarUrl?: string;
  online?: boolean;
  _id?: string;
}

interface ChatBoxProps {
  currentUser: string;
  initialChatWith: string;
  users: User[];
}

let socket: Socket | null = null;
export default function ChatBox({ currentUser, initialChatWith, users }: ChatBoxProps) {
  const [chatWith, setChatWith] = useState(initialChatWith);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = useCallback(() => {
    if (!socket || !message.trim()) return;

    const msgPayload = { sender: currentUser, recipient: chatWith, message };
    socket.emit('send_message', msgPayload);
    // Optimistic update: Add message to local state immediately
    // The server will broadcast it back, but we add it here to avoid flicker.
    // If your backend assigns a unique ID, you might want to wait for the
    // 'receive_message' event and check for duplicates by ID.
    setMessages((prev) => [...prev, { ...msgPayload, timestamp: new Date().toISOString() }]);
    setMessage('');
    scrollToBottom(); // Scroll after sending
  }, [message, currentUser, chatWith]);

  const handleTyping = useCallback(() => {
    if (socket) {
      socket.emit('typing', { sender: currentUser, recipient: chatWith });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setTypingUser(null);
      }, 2500);
    }
  }, [currentUser, chatWith]);


  useEffect(() => {
    if (!socket) {
      socket = io({
        path: '/api/socket',
        query: { email: currentUser },
      });

      socket.on('connect', () => {
        console.log('Connected to socket:', socket?.id);
      });

      socket.on('receive_message', (msg: Message) => {
        setMessages((prevMessages) => {
          if (msg._id && prevMessages.some(m => m._id === msg._id)) {
            return prevMessages;
          }

          if (
            (msg.sender === currentUser && msg.recipient === chatWith) ||
            (msg.sender === chatWith && msg.recipient === currentUser)
          ) {
            return [...prevMessages, msg];
          }
          return prevMessages;
        });
        scrollToBottom();
      });

      socket.on('typing', (senderEmail: string) => {
        if (senderEmail === chatWith) {
          setTypingUser(senderEmail);
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
          typingTimeoutRef.current = setTimeout(() => {
            setTypingUser(null);
          }, 2500);
        }
      });

      socket.on('online_users', (emails: string[]) => {
        setOnlineUsers(emails);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected');
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentUser, chatWith]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages?userEmail=${currentUser}&otherEmail=${chatWith}`);
        if (!res.ok) {
          throw new Error(`Error fetching messages: ${res.statusText}`);
        }
        const data: Message[] = await res.json();
        setMessages(data);
        scrollToBottom();
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        setMessages([]);
      }
    };
    fetchMessages();
  }, [chatWith, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const enrichedUsers = users.map((user) => ({
    ...user,
    online: onlineUsers.includes(user.email),
  }));

  const selectedUser = enrichedUsers.find(u => u.email === chatWith);
  const chatWithDisplayName = selectedUser?.name || selectedUser?.email;

  return (
    <div className="flex flex-col max-h-[380px] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
        <div className="flex items-center space-x-3">
          {selectedUser?.avatarUrl ? (
            <Image
              src={selectedUser.avatarUrl}
              alt={chatWithDisplayName || 'User'}
              width={40}
              height={40}
              className="rounded-full border-2 border-white"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold text-lg">
              {chatWithDisplayName ? chatWithDisplayName[0].toUpperCase() : '?'}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{chatWithDisplayName}</h2>
            <span className={`text-sm ${selectedUser?.online ? 'text-green-300' : 'text-gray-300'}`}>
              {selectedUser?.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <div className="relative">
          <select
            value={chatWith}
            onChange={(e) => setChatWith(e.target.value)}
            className="appearance-none bg-blue-700 text-white py-2 pl-4 pr-10 rounded-full cursor-pointer hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
          >
            {enrichedUsers.map((user) => (
              <option key={user._id || user.email} value={user.email} className="bg-white text-gray-900">
                {user.name || user.email} {user.online ? '🟢' : '⚪'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 chat-messages-container">
        <div className="flex flex-col space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 italic mt-10">
              Start your conversation!
            </div>
          )}
          {messages.map((msg, idx) => {
            const isSentByCurrentUser = msg.sender === currentUser;
            const displaySenderName = isSentByCurrentUser ? 'You' : (enrichedUsers.find(u => u.email === msg.sender)?.name || msg.sender);
            return (
              <div
                key={idx}
                className={`flex ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg shadow-md ${
                    isSentByCurrentUser
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <strong className="block text-xs font-semibold mb-1">
                    {displaySenderName}
                  </strong>
                  <p className="text-sm break-words">{msg.message}</p>
                  <span className={`block text-xs mt-1 ${isSentByCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {typingUser && typingUser === chatWith && (
        <div className="p-2 text-sm text-gray-600 italic bg-gray-100 border-t border-gray-200">
          {chatWithDisplayName} is typing...
        </div>
      )}

      <div className="p-4 bg-gray-100 border-t border-gray-200 flex items-center space-x-3">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="flex-1 border border-gray-300 rounded-full px-5 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          placeholder="Send a message..."
        />
        <button
          onClick={sendMessage}
          disabled={!message.trim()}
          className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Send Message"
        >
          <FontAwesomeIcon icon={faUpRightFromSquare} className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}