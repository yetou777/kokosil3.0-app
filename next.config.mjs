/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/, // tsx, jsx から import されるときだけ対象
            use: ["@svgr/webpack"],
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'ginza.kokosil.net',
            },
            {
                protocol: 'https',
                hostname: 'ueno.kokosil.net',
            },
            {
                protocol: 'https',
                hostname: 'akihabara.kokosil.net',
            },
            {
                protocol: 'https',
                hostname: 'ikebukuro.kokosil.net',
            },
            {
                protocol: 'https',
                hostname: 'komae.kokosil.net',
            },
        ],
    },
};

export default nextConfig;
