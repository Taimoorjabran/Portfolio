// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ContactMessage from '@/models/ContactMessage';

export async function POST(req: NextRequest) {
  try {
    console.log('Attempting to connect to DB...');
    await dbConnect();
    console.log('DB Connected.');

    const { name, email, message } = await req.json();
    console.log('Received data:', { name, email, message });


    if (!name || !email || !message) {
      console.error('Validation error: All fields are required');
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newMessage = new ContactMessage({ name, email, message });
    console.log('New message instance created.');
    await newMessage.save();
    console.log('Message saved successfully.');

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (err: any) {
    console.error('Server error in API route:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}