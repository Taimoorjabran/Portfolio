import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, lastChattedWith } = body;

  try {
    await dbConnect();
    await User.findOneAndUpdate(
      { email },
      { lastChattedWith },
      { new: true, upsert: false }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update lastChattedWith:', error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
