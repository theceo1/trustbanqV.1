// src/pages/login.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Alert from '@/components/common/Alert';
import Head from 'next/head';
import Link from 'next/link';

interface AuthResponse {
  message: string;
  token?: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      console.log('Received token from query params:', router.query.token);
      localStorage.setItem('token', router.query.token as string);
      router.push('/');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      console.log('Attempting login with credentials:', { email, password });
      const response = await axios.post<AuthResponse>('/api/auth/login', { email, password });
      console.log('Login response data:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token stored in localStorage:', response.data.token);
        router.push('/');
      } else {
        console.warn('No token received in login response, response message:', response.data.message);
        setError('Login successful, but no token received. Please try again.');
      }
    } catch (err: any) {
      console.error('Login error caught in catch block:', err);
      
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        console.error('Error response headers:', err.response.headers);
        
        if (err.response.status === 400) {
          setError(`Bad Request: ${err.response.data?.message || 'Invalid input'}`);
        } else if (err.response.status === 401) {
          setError('Authentication failed. Please check your credentials.');
        } else if (err.response.status === 404) {
          setError('User not found. Please check your email or register a new account.');
        } else {
          setError(`An error occurred: ${err.response.data?.message || 'Please try again later.'}`);
        }
      } else if (err.request) {
        console.error('Error request (no response received):', err.request);
        setError('No response received from the server. Please check your internet connection.');
      } else {
        console.error('Error message:', err.message);
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      console.log('Login process complete, setting isLoading to false');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Redirecting to Google login...');
    window.location.href = '/api/auth/google';
  };

  return (
    <>
      <Head>
        <title>Login - trustBank</title>
        <meta name="description" content="Login to your account" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">Login to Your Account</h2>
          {error && <Alert type="error" message={error} />}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-green-300 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-green-300 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 text-white rounded-md text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <div className="flex justify-between items-center mt-4">
              <Link href="/auth/RequestReset" legacyBehavior><a><span className="text-sm text-green-600 hover:underline">Forgot your password?</span></a></Link>
            </div>
          </form>
          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 bg-red-600 text-white rounded-md text-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Continue with Google
            </button>
          </div>
          <p className="text-sm text-center text-gray-400 mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/register" legacyBehavior>
              <a className="text-green-600 hover:underline">Register</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
