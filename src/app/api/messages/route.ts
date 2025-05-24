import { NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Chat from '@/models/Chat';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get('userEmail');
  const otherEmail = searchParams.get('otherEmail');

  if (!userEmail || !otherEmail) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
  }

  try {
    await dbConnect();

    const chats = await Chat.find({
      $or: [
        { sender: userEmail, recipient: otherEmail },
        { sender: otherEmail, recipient: userEmail },
      ],
    })
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

    return new Response(JSON.stringify(chats), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
