// 'use client';
// 
// import { useEffect, useState, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { saveTokens } from '@/lib/auth';
// 
// // Forzar que esta página sea dinámica
// export const dynamic = 'force-dynamic';
// 
// export default function CallbackPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true); // nuevo estado de carga
//   const hasProcessed = useRef(false);
// 
//   useEffect(() => {
//     if (hasProcessed.current) return;
// 
//     const processOAuth = async () => {
//       const code = searchParams.get('code');
//       const state = searchParams.get('state');
//       const errorParam = searchParams.get('error');
// 
//       if (errorParam) {
//         setError('Autenticación cancelada');
//         setLoading(false);
//         return;
//       }
// 
//       if (!code) {
//         setError('No se recibió código de autorización');
//         setLoading(false);
//         return;
//       }
// 
//       // Validar state para prevenir CSRF
//       const savedState = localStorage.getItem('spotify_auth_state');
//       if (!state || state !== savedState) {
//         setError(
//           'Error de validación de seguridad (CSRF). Intenta iniciar sesión de nuevo.'
//         );
//         localStorage.removeItem('spotify_auth_state');
//         setLoading(false);
//         return;
//       }
// 
//       localStorage.removeItem('spotify_auth_state');
//       hasProcessed.current = true;
// 
//       try {
//         const response = await fetch('/api/spotify-token', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ code }),
//         });
// 
//         const data = await response.json();
// 
//         if (!response.ok) {
//           throw new Error(data.error || 'Error al obtener token');
//         }
// 
//         // Guardar tokens
//         saveTokens(data.access_token, data.refresh_token, data.expires_in);
// 
//         // Redirigir al dashboard
//         router.push('/dashboard');
//       } catch (err) {
//         console.error('Error:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
// 
//     processOAuth();
//   }, [searchParams, router]);
// 
//   // Render de error
//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
//           <p className="text-white mb-6">{error}</p>
//           <button
//             onClick={() => router.push('/')}
//             className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
//           >
//             Volver al inicio
//           </button>
//         </div>
//       </div>
//     );
//   }
// 
//   // Render de loading
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
//           <p className="text-white text-xl">Autenticando...</p>
//         </div>
//       </div>
//     );
//   }
// 
//   // Por seguridad, fallback
//   return null;
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/callback"); // redirige al Pages Router
  }, [router]);

  return null;
}
