/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Разрешаем картинки с прод-домена и локальной разработки
    remotePatterns: [
      // продакшен (Punycode-домен)
      { protocol: 'https', hostname: 'xn--80aaf6atok.xn--90ais' },

      // локальная разработка
      { protocol: 'http', hostname: 'localhost', pathname: '/uploads/**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '/uploads/**' },
    ],
  },
};

module.exports = nextConfig;
