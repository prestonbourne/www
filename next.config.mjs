import _withMDX from "@next/mdx";

const withMDX = _withMDX({
    extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.glsl/,
            use: ["raw-loader"],
        });

        return config;
    },
    // usually doesn't need to be changed but needed for MDX
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
    images: {
        domains: ["*"],
    },
};

export default withMDX(nextConfig);
