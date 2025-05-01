const withVercelToolbar = require('@vercel/toolbar/plugins/next')();
const rehypeSlug = require("rehype-slug").default;
const remarkGfm = require("remark-gfm").default;
const rehypePrettyCode = require("rehype-pretty-code").default;

const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [
            remarkGfm,
        ],
        rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, {
                theme: {
                    dark: "night-owl",
                    light: "github-light",
                },
                defaultLang: "tsx",
                keepBackground: false,
            }],
        ],
    },
});


/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(glsl|wgsl)$/,
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

module.exports = withVercelToolbar(withMDX(nextConfig));

