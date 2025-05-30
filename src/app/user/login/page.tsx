import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LoginForm from '@/app/user/login/LoginForm';
import { authOptions } from '@/lib/auth';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/dashboard');

  return <LoginForm />;
}
