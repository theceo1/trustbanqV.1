import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    if (typeof window !== 'undefined') {
      if (!isAuthenticated) {
        router.replace('/login');
        return null;
      }
      return <WrappedComponent {...props} />;
    }

    // If we're on server, return null
    return null;
  };
};

export default ProtectedRoute;