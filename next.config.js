// next.config.js
module.exports = {
	images: {
	  remotePatterns: [
		 {
			protocol: 'http',
			hostname: 'localhost',
			port: '3000', // Include port if needed
			pathname: '/uploads/**', // Allow all images in the /uploads/ directory
		 },
	  ],
	},
	env: {
	  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://автокар.бел',
	},
 };
 

//  images: {
// 	remotePatterns: [
// 	  {
// 		 protocol: 'https',
// 		 hostname: process.env.NEXT_PUBLIC_HOSTNAME || 'domen.by', // use production domain
// 		 pathname: '/uploads/**', // Allow all images in the /uploads/ directory
// 	  },
// 	],
//  },
//  env: {
// 	NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://domen.by',
//  },