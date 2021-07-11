module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/trending',
        permanent: true
      }
    ]
  }
}
