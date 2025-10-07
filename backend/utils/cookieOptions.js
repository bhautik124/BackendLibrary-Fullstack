// Cookie options for production and development
const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    httpOnly: true,
    secure: isProduction, // true in production (HTTPS required)
    sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site cookies in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };
};

module.exports = getCookieOptions;
