/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tarmeezacademy.com",
                port: "",
                pathname: "/images/posts/**",
            },
            {
                protocol: "https",
                hostname: "tarmeezacademy.com",
                port: "",
                pathname: "/images/profiles/**",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
                port: "", // For your placeholder images
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
