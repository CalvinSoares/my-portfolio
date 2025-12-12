/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone", 
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
