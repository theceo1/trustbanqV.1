import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  const { token } = router.query;

  interface ResponseType {
    message: string;
  }

  const isAxiosError = (error: any): error is axios.AxiosError => {
    return (error as axios.AxiosError).isAxiosError === true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<ResponseType>('/api/users/reset-password', { token, password });
      setMessage(data.message);
      if (data.message === 'Password reset successful') {
        router.push('/login');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data.message);
      } else {
        console.error('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ResetPassword;
