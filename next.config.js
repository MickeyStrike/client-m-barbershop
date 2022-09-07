
module.exports = {
  devtool: "source-map",
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  experimental: {
    styledComponents: true,
    nextScriptWorkers: true,
  },
  images: {
    domains: ['drive.google.com'],
  },
}
