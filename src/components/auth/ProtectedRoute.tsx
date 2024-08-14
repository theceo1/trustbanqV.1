import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authContext = useAuth();
  const router = useRouter();

  if (!authContext?.user) {  // Use optional chaining to check if user exists
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
