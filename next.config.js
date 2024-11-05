/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		 remotePatterns: [
			  {
					protocol: 'https',
					hostname: 'xn--80aaf6atok.xn--90ais',
					pathname: '/uploads/**',
			  },
		 ],
	},
};

module.exports = nextConfig;
