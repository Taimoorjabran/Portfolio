import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoginForm from '@/app/user/login/LoginForm';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/dashboard');

  return <LoginForm />;
}
