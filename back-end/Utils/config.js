const config = {
  mongoURI: process.env.MONGODB_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  STRIPE_KEY: process.env.STRIPE_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
};

export default config;
