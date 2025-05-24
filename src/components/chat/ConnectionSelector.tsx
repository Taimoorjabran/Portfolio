interface User {
    email: string;
    name: string;
    avatarUrl?: string;
    online?: boolean;
  }
  
  interface Props {
    users: User[];
    currentUserEmail: string;
    chatWith: string;
    setChatWith: (email: string) => void;
  }
  
  export default function ConnectionSelector({ users, chatWith, setChatWith, currentUserEmail }: Props) {
    return (
      <div className="flex space-x-2 overflow-x-auto mb-4">
        {users
          .filter((u) => u.email !== currentUserEmail)
          .map((u) => (
            <div
              key={u.email}
              onClick={() => setChatWith(u.email)}
              className={`cursor-pointer p-2 border rounded ${chatWith === u.email ? 'bg-blue-100' : ''}`}
            >
              <div className="flex items-center space-x-2">
                <img src={u.avatarUrl || '/default-avatar.png'} alt="avatar" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm">{u.name || u.email}</p>
                  <span className={`text-xs ${u.online ? 'text-green-500' : 'text-gray-400'}`}>
                    {u.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
  