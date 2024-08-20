import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Alert from '@/components/common/Alert';
import Head from 'next/head';

interface AuthResponse {
  token: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if the token is in the URL after OAuth
    if (router.query.token) {
      console.log('Received token:', router.query.token);
      // Save the token to localStorage
      localStorage.setItem('token', router.query.token as string);
      // Redirect to the home page
      router.push('/');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<AuthResponse>('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store token
      console.log('Login successful:', response.data);
      router.push('/'); // Redirect after login
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'Login failed';
      console.error('Login failed:', errorMessage);
      setError(errorMessage);
    }
  };

  const handleGoogleLogin = () => {
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
            className="w-full py-3 px-4 bg-green-600 text-white rounded-md text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Login
          </button>
          <div className="flex justify-between items-center mt-4">
            <a href="/auth/RequestReset" className="text-sm text-green-600 hover:underline">Forgot Password?</a>
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
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Don&apos;t have an account? <a href="/register" className="text-green-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
