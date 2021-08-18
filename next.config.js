module.exports = {
  env: {
    apiKey: process.env.API_KEY
  },
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
