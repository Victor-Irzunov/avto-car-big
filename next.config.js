// next.config.js
module.exports = {
	images: {
	  remotePatterns: [
		 {
			protocol: 'http',
			hostname: 'localhost',
			port: '3000', 
			pathname: '/uploads/**',
		 },
		 {
			protocol: 'https',
			hostname: process.env.NEXT_PUBLIC_BASE_URL || 'автокар.бел',
			pathname: '/uploads/**',
		 },
	  ],
	},
	env: {
	  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://автокар.бел',
	},
 };
 