/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  remotePatterns: [
		{
		  protocol: 'https', // Specify the protocol (http or https)
		  hostname: 'автокар.бел', // Your domain for the images
		  port: '', // Leave empty for default ports
		  pathname: '/uploads/**', // Path to allow images from
		},
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
