import { Server as HTTPServer } from 'http';
import { Socket } from 'net';
import { Server as IOServer } from 'socket.io';
import NextAuth from 'next-auth';
import type { NextApiResponse } from 'next';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: HTTPServer & {
      io: IOServer;
    };
  };
};

export type ChatMessage = {
  sender: string;
  recipient?: string;
  message: string;
  timestamp: string;
};


declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; 
    };
  }

  interface User {
    role?: string;
  }

  interface JWT {
    role?: string; 
  }
}


