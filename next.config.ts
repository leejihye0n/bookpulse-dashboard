const repo = "bookpulse-dashboard";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  trailingSlash: true,

  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
