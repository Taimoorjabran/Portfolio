import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Connections from '@/components/chat/Connections';
import ChatList from '@/components/chat/ChatList';
import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import User, { IUser } from '@/models/User';
import Chat from '@/models/Chat';
import { redirect } from 'next/navigation';
import { ChatMessage } from '@/types/next';
import ChatBox from '@/components/chat/Chatbox';
import ContactMessage from '@/models/ContactMessage';

interface UserType {
  _id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role?: string;
  online?: boolean;
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session || !session.user?.email) redirect('/user/login');

  const currentUserEmail = session.user.email;

  await dbConnect();
  const currentUser = await User.findOne({ email: currentUserEmail }).lean<IUser>();

  let users: UserType[] = [];
  let recruiterMessages: ChatMessage[] = [];
  let userMessages: ChatMessage[] = [];

  if (currentUser?.role === 'admin') {
    const registeredUsers = await User.find({ email: { $ne: currentUserEmail } }).lean<IUser[]>();

    users = registeredUsers.map((u) => ({
      email: u.email,
      name: u.name,
      avatarUrl: u.avatarUrl,
      _id: u._id.toString(),
    }));

    const emails = registeredUsers.map((u) => u.email);

    const contactMessages = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();
    recruiterMessages = contactMessages.map((msg) => ({
      sender: msg.email,
      message: msg.message,
      timestamp: new Date(msg.createdAt).toISOString(),
    }));

    const rawChats = await Chat.find({
      $or: [
        { sender: currentUserEmail, recipient: { $in: emails } },
        { sender: { $in: emails }, recipient: currentUserEmail },
      ],
    })
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

    userMessages = rawChats.map((doc) => ({
      sender: doc.sender,
      recipient: doc.recipient,
      message: doc.message,
      timestamp:
        doc.timestamp instanceof Date
          ? doc.timestamp.toISOString()
          : new Date(doc.timestamp).toISOString(),
    }));
  } else {
    const adminList = await User.find({ role: 'admin' }).lean<IUser[]>();
    if (adminList) {
      users = adminList.map((u) => ({
        email: u.email,
        name: u.name,
        avatarUrl: u.avatarUrl,
        _id: u._id.toString(),
      }));

      const emails = adminList.map((u) => u.email);

      const rawChats = await Chat.find({
        $or: [
          { sender: currentUserEmail, recipient: { $in: emails } },
          { sender: { $in: emails }, recipient: currentUserEmail },
        ],
      })
        .sort({ timestamp: -1 })
        .limit(50)
        .lean();

      userMessages = rawChats.map((doc) => ({
        sender: doc.sender,
        recipient: doc.recipient,
        message: doc.message,
        timestamp:
          doc.timestamp instanceof Date
            ? doc.timestamp.toISOString()
            : new Date(doc.timestamp).toISOString(),
      }));
    }
  }

  const lastChatExists = users.find(u => u.email === currentUser?.lastChattedWith);
  const chatWithEmail = lastChatExists
    ? currentUser?.lastChattedWith
    : users.length > 0
      ? users[0].email
      : currentUserEmail;

  return (
    <DashboardLayout>
      <div className="flex flex-row md:flex-row gap-6 p-6">
        <div className="flex-1 md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome, <span className="text-blue-600">{currentUser?.name || currentUser?.email}</span>!
            </h2>
            <p className="text-gray-600 text-md mt-1">Your role: <span className="font-semibold capitalize">{currentUser?.role}</span></p>
          </div>
          {currentUser?.role === 'admin' ? <Connections users={users} />
            : (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">👋 Welcome to My Portfolio</h2>
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  You’re invited to connect directly with <span className="font-semibold text-blue-600">Taimoor Jabran</span>
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1 text-sm">
                  <li>💬 Have a project idea? Need a developer? Or just exploring? Let’s talk!</li>
                  <li>🤝 Open to collaboration, feedback, or freelance opportunities.</li>
                  <li>🔧 Tech Stack: <span className="font-medium text-gray-700">React, Next.js, TypeScript, Node.js</span></li>
                  <li>✅ 100% response rate — your message matters!</li>
                </ul>
              </div>
            )}
        </div>
        <div className="flex-1 md:w-1/3">
          <ChatList recruiterChats={recruiterMessages} userChats={userMessages} role={currentUser?.role || 'user'} />
        </div>
      </div>
      <div>
        {users.length > 0 ? (
          <ChatBox
            currentUser={currentUser}
            initialChatWith={chatWithEmail}
            users={users}
          />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-600 h-[550px] flex items-center justify-center">
            <p className="text-lg">No one to chat with. Please check your connections.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}