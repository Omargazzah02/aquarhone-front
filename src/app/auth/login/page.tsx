'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/api/auth';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

import { useAuth } from '@/components/ClientProvider';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
    
  const { user } = useAuth();



    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await loginUser({ email, password });
window.location.href = '/activities';
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
    <div className='w-full flex justify-center flex-col items-center h-screen'>
      

    <form onSubmit={handleSubmit} className='form'>
      <h1 className='title'>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className='input-form'
        required

      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className='input-form'
      />
      <button type="submit" className='btn-submit'>Submit</button>

       <p className='text-white'>
        Don't have an account?{' '}
        <Link href="/auth/register" className='link'>
          Register here
        </Link>
        </p>
    </form>
    </div>
  );
}


