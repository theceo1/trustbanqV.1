import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', {
        email,
        password,
      });
      console.log('Registration successful:', response.data);
      // Redirect to login or another page
    } catch (err: unknown) {
      const errorMessage = (err as any).response?.data?.message || 'Registration failed';
      console.error('Registration failed:', errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title as React.CSSProperties}>Create an Account</h1>
        {error && <p style={styles.error as React.CSSProperties}>{error}</p>}
        <form onSubmit={handleRegister} style={styles.form as React.CSSProperties}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.footer as React.CSSProperties}>
          Already have an account? <a href="/login" style={styles.link}>Sign in</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    textAlign: 'center' as 'center', // Casting to a valid type
    color: '#333',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center' as 'center', // Casting to a valid type
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column', // Casting to a valid type
  },
  input: {
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#007BFF',
  },
  button: {
    padding: '0.8rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  footer: {
    marginTop: '1rem',
    textAlign: 'center' as 'center', // Casting to a valid type
    color: '#555',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
  linkHover: {
    textDecoration: 'underline',
  },
};

export default RegisterPage;
