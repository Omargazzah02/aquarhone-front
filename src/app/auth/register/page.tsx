'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/api/auth';
import Link from 'next/link';
import { useEffect } from 'react';

import { useAuth } from '@/components/ClientProvider';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [error, setError] = useState<string | null>(null);

    const { user } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await registerUser({ username , email, password  });
      router.push('/auth/login');
    } catch (err: any) {
      setError(err.message);
    }
  };


      useEffect(() => {
    if (user) {
      router.push('/activities');
    } 
  }, [user]);

  return (
    <div className='w-full flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='form'>
      <h1 className='title'>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
            className='input-form'
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
      className='input-form'
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

   
      <input
      className='input-form'
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" className='btn-submit'>Submit</button>


         <p className='text-white'>
        Already have an account?{' '}
        <Link href="/auth/login" className='link'>
          Login here
        </Link>
      </p>
    </form>
    </div>
  );
}
