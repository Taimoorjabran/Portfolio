import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import next from 'next';
import dbConnect from './src/lib/dbConnect';
import Chat from './src/models/Chat';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = parseInt(process.env.PORT || '3000', 10);

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);

  const io = new Server(httpServer, {
    path: '/api/socket',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  const onlineUsers = new Map<string, string>(); // email -> socket.id

  io.on('connection', (socket: Socket) => {
    const email = socket.handshake.query.email as string;

    if (email) {
      console.log(`✅ ${email} connected with socket ID: ${socket.id}`);
      onlineUsers.set(email, socket.id);
      io.emit('online_users', Array.from(onlineUsers.keys()));
    }

    // Handle sending messages
    socket.on('send_message', async (msg: {
      sender: string;
      recipient: string;
      message: string;
    }) => {
      try {
        await dbConnect();
        const chat = new Chat({ ...msg, timestamp: new Date() });
        await chat.save();

        const recipientSocketId = onlineUsers.get(msg.recipient);
        const senderSocketId = onlineUsers.get(msg.sender);

        // Send to recipient only if online
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('receive_message', chat);
        }

        // Also emit to sender to update their UI
        if (senderSocketId) {
          io.to(senderSocketId).emit('receive_message', chat);
        }
      } catch (err) {
        console.error('Message save error:', err);
      }
    });

    // Handle typing
    socket.on('typing', ({ sender, recipient }) => {
      const recipientSocketId = onlineUsers.get(recipient);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('typing', sender);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      if (email) {
        console.log(`${email} disconnected`);
        onlineUsers.delete(email);
        io.emit('online_users', Array.from(onlineUsers.keys()));
      }
    });
  });

  server.use((req: Request, res: Response) => {
    return handle(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`Server ready on http://localhost:${port}`);
  });
});
