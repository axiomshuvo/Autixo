/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 1. Whitelist secure remote URLs
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
    ],
    // 2. Select preferred modern file formats
    // formats: ["image/avif", "image/webp"],
    // 3. Define responsive width breakpoints
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
};

export default nextConfig;
