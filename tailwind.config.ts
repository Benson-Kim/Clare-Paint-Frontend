import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "media", // or 'class' if you're toggling manually
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./lib/**/*.{js,ts,jsx,tsx}",
		"./hooks/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				card: "hsl(var(--card) / <alpha-value>)",
				"card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",
				popover: "hsl(var(--popover) / <alpha-value>)",
				"popover-foreground": "hsl(var(--popover-foreground) / <alpha-value>)",
				primary: "hsl(var(--primary) / <alpha-value>)",
				"primary-foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
				secondary: "hsl(var(--secondary) / <alpha-value>)",
				"secondary-foreground":
					"hsl(var(--secondary-foreground) / <alpha-value>)",
				muted: "hsl(var(--muted) / <alpha-value>)",
				"muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
				accent: "hsl(var(--accent) / <alpha-value>)",
				"accent-foreground": "hsl(var(--accent-foreground) / <alpha-value>)",
				destructive: "hsl(var(--destructive) / <alpha-value>)",
				"destructive-foreground":
					"hsl(var(--destructive-foreground) / <alpha-value>)",
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",

				// Chart colors
				"chart-1": "hsl(var(--chart-1) / <alpha-value>)",
				"chart-2": "hsl(var(--chart-2) / <alpha-value>)",
				"chart-3": "hsl(var(--chart-3) / <alpha-value>)",
				"chart-4": "hsl(var(--chart-4) / <alpha-value>)",
				"chart-5": "hsl(var(--chart-5) / <alpha-value>)",

				// Design System / Brand
				"ds-primary-sage": "var(--ds-primary-sage)",
				"ds-primary-charcoal": "var(--ds-primary-charcoal)",
				"ds-primary-cream": "var(--ds-primary-cream)",
				"ds-accent-warmBeige": "var(--ds-accent-warmBeige)",
				"ds-accent-warmBrown": "var(--ds-accent-warmBrown)",
				"ds-accent-mustard": "var(--ds-accent-mustard)",
				"ds-neutral-white": "var(--ds-neutral-white)",
				"ds-neutral-lightGray": "var(--ds-neutral-lightGray)",
				"ds-neutral-mediumGray": "var(--ds-neutral-mediumGray)",
				"ds-neutral-darkSlate": "var(--ds-neutral-darkSlate)",
			},
			fontFamily: {
				inter: ["Inter", "system-ui", "sans-serif"],
			},
			fontSize: {
				"landing-h1": ["48px", { lineHeight: "1.1", fontWeight: "700" }],
				"landing-h2": ["36px", { lineHeight: "1.2", fontWeight: "600" }],
				"landing-body": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
			},
			spacing: {
				"landing-section": "80px",
				"landing-component": "32px",
			},
			maxWidth: {
				landing: "1200px",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"slide-in-from-top": "slide-in-from-top 0.3s ease-out",
				"slide-out-to-top": "slide-out-to-top 0.3s ease-in",
				"badge-bounce": "badge-bounce 0.6s ease-in-out",
				"fade-in-up": "fadeInUp 0.8s ease-out",
				"scale-in": "scaleIn 0.6s ease-out",
				"slide-in-left": "slideInLeft 0.8s ease-out",
				"slide-in-right": "slideInRight 0.8s ease-out",
			},
			backdropBlur: {
				xs: "2px",
			},
			boxShadow: {
				header:
					"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
				dropdown:
					"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
			},
			zIndex: {
				dropdown: "50",
				overlay: "60",
				modal: "70",
				"landing-hero": "10",
				"landing-nav": "40",
			},
			screens: {
				"landing-lg": "1024px",
				"landing-md": "768px",
				"landing-sm": "480px",
			},
		},
	},
	plugins: [],
};

export default config;
