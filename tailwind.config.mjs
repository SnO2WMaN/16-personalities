/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				twitter: {
					1: "#1da1f2",
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
