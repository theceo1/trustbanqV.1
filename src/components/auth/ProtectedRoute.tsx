// src/components/auth/ProtectedRoute.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/'); // Redirect to login page if not authenticated
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
