/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Dominio clásico de canciones/portadas
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
      // Cualquier subdominio de image-cdn-*.spotifycdn.com
      {
        protocol: "https",
        hostname: "image-cdn-*.spotifycdn.com",
        port: "",
        pathname: "/image/**",
      },
      // Dominio mosaic (para mosaicos de playlist)
      {
        protocol: "https",
        hostname: "mosaic.scdn.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
