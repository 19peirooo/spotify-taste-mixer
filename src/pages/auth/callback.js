import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { saveTokens } from '@/lib/auth';

export default function CallbackPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;

    const { code, state, error: errorParam } = router.query;

    if (errorParam) {
      setError('Autenticación cancelada');
      setLoading(false);
      return;
    }

    if (!code) {
      setError('No se recibió código de autorización');
      setLoading(false);
      return;
    }

    const savedState = localStorage.getItem('spotify_auth_state');
    if (!state || state !== savedState) {
      setError('Error de validación de seguridad (CSRF). Intenta iniciar sesión de nuevo.');
      localStorage.removeItem('spotify_auth_state');
      setLoading(false);
      return;
    }

    localStorage.removeItem('spotify_auth_state');
    hasProcessed.current = true;

    const exchangeCodeForToken = async () => {
      try {
        const response = await fetch('/api/spotify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Error al obtener token');

        saveTokens(data.access_token, data.refresh_token, data.expires_in);
        router.push('/dashboard');
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    exchangeCodeForToken();
  }, [router.query]);

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-white mb-6">{error}</p>
        <button onClick={() => router.push('/')} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
          Volver al inicio
        </button>
      </div>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p className="text-white text-xl">Autenticando...</p>
      </div>
    </div>
  );

  return null;
}
