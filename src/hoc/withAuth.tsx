// src/hoc/withAuth.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.FC) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const router = useRouter();
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token is found, redirect to the login page
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
