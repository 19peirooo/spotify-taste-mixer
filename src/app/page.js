'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/main/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className='w-[60vw] h-[80vh] bg-radial from-black via-green-700 to-green-800 rounded-full flex flex-col justify-center items-center'>
            <h1 className='text-5xl font-extrabold text-white drop-shadow-lg mb-8 text-center'>🎵 Spotify Taste Mixer</h1>
            <button 
              className="bg-gray-500 hover:bg-green-500 text-white font-semibold px-10 py-3 rounded-full shadow-lg transform transition duration-300 hover:scale-105" 
              onClick={handleLogin}>
                Login
            </button>
          </div>
        </div>
      </>  
  );
}


