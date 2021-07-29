module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/trending/1',
        permanent: true,
      },
    ]
  },
}
