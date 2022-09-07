
module.exports = {
  devtool: "source-map",
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  experimental: {
    styledComponents: true,
  },
  images: {
    domains: ['drive.google.com'],
  },
}
