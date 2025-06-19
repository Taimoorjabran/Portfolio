import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (!email) return res.status(400).json({ error: 'Missing email' });

  try {
    await dbConnect();
    const user = await User.findOne({ email });
    res.status(200).json({ lastChattedWith: user?.lastChattedWith || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
