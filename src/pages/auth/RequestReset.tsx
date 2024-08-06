import { useState, FormEvent } from 'react';
import axios from 'axios';

const RequestReset = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  interface ResponseType {
    message: string;
  }

  const isAxiosError = (error: any): error is axios.AxiosError => {
    return (error as axios.AxiosError).isAxiosError === true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<ResponseType>('/api/users/request-password-reset', { email });
      setMessage(data.message);
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
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Request Password Reset</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RequestReset;
