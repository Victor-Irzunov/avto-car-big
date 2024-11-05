/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  remotePatterns: [
		 {
			protocol: 'https',
			hostname: 'автокар.бел',
			pathname: '/uploads/**',
		 },
	  ],
	},
 };
 
 module.exports = nextConfig;
 