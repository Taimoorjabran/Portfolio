import { Server } from 'socket.io';
import dbConnect from '@/lib/dbConnect';
import Chat from '@/models/Chat';


export const GET = async (req: Request) => {
  // Usually socket.io upgrades happen on websocket connection, 
  // but Next.js API routes can only handle HTTP methods.
  // You might need a custom server for socket.io or use next.js middleware.

  return new Response('Socket.io GET route');
};

export const POST = async (req: Request) => {
  return new Response('POST received');
};
