// src/pages/register.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Alert from '@/components/common/Alert';
import Head from 'next/head';
import Link from 'next/link';
import { register } from '@/services/api';
import { registerWithGoogle } from '@/services/authService';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      localStorage.setItem('token', router.query.token as string);
      router.push('/');
    }
  }, [router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(email, password, name);
      console.log('Registration successful:', response);
      setSuccess('Registration successful! Please check your email to confirm your account before logging in.');
      // Automatically log in the user after registration
      localStorage.setItem('token', response.token); // Assuming the response contains a token
      router.push('/'); // Redirect to homepage after successful registration
    } catch (error: any) {
      setError('Registration failed: ' + error.message);
    }
  };

  const handleGoogleRegister = () => {
    console.log("Starting Google OAuth flow");
    registerWithGoogle();
  };

  return (
    <>
      <Head>
        <title>Register - trustBank</title>
        <meta name="description" content="Create an account" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">Create Your Account</h2>
          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-green-300 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
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
              Register
            </button>
          </form>
          <div className="mt-4">
            <button
              onClick={handleGoogleRegister}
              className="w-full py-3 px-4 bg-red-600 text-white rounded-md text-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Continue with Google
            </button>
          </div>
          <p className="text-sm text-center text-gray-400">
            Already have an account? <Link href="/login"><span className="text-green-600 hover:underline">Login</span></Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
