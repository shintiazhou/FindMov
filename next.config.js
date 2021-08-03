module.exports = {
  env: {
    apiKey: "b4d716b5b9583975e5b0f9f8144bbdca"
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
