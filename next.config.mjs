module.exports = {
    env: {
      BUCKET_NAME: process.env.BUCKET_NAME,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_REGION: process.env.AWS_REGION
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ];
    },
  };
  