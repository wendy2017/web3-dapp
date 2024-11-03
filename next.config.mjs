/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-inventorymanagement.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    // config.externals.push("pino-pretty", "encoding");
    // config.plugins.push(
    //   commonjs({
    //     exclude: ["node_modules/pino-pretty/**"],
    //   })
    // );
    config.externals.push("pino-pretty");
    config.externals.push("encoding");
    return config;
  },
};

export default nextConfig;
