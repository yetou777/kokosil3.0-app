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
};

export default nextConfig;
