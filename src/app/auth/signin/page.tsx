"use client"

import { getSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const session = getSession();
  const router = useRouter();

  session.then((session) => {
    if(session && session.user){
      router.push('/');
    }
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username: email,
      password,
    });
    if (!result?.error) {
      router.push('/');
    } else {
      console.error(result.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl font-bold mb-6">Welcome to Big Brother AI</h1>
      <form className="p-2" onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}