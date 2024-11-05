/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  domains: ['автокар.бел', 'localhost'],
	  remotePatterns: [
		 {
			protocol: 'http',
			hostname: 'localhost',
			port: '3000',
			pathname: '/uploads/**',
		 },
	  ],
	},
 };
 
 module.exports = nextConfig;
 