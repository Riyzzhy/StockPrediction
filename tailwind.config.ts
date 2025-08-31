import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				'financial-dark': 'hsl(var(--financial-dark))',
				'financial-darker': 'hsl(var(--financial-darker))',
				'financial-success': 'hsl(var(--financial-success))',
				'financial-danger': 'hsl(var(--financial-danger))',
				'financial-warning': 'hsl(var(--financial-warning))',
				'financial-prediction': 'hsl(var(--financial-prediction))',
				'financial-neutral': 'hsl(var(--financial-neutral))',
				'chart-primary': 'hsl(var(--chart-primary))',
				'chart-secondary': 'hsl(var(--chart-secondary))',
				'chart-tertiary': 'hsl(var(--chart-tertiary))',
				'chart-quaternary': 'hsl(var(--chart-quaternary))',
				'chart-grid': 'hsl(var(--chart-grid))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'chart-fade': 'chartFade 0.8s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'slide-up': 'slideUp 0.5s ease-out',
				'fade-in': 'fadeIn 0.6s ease-out',
				'slide-down': 'slideDown 0.3s ease-out',
				'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'stagger-in': 'staggerIn 0.6s ease-out',
				'shimmer': 'shimmer 1.5s infinite',
				'count-up': 'countUp 0.8s ease-out',
				'progress-fill': 'progressFill 1s ease-out',
				'line-drawing': 'lineDrawing 2s ease-out',
				'path-reveal': 'pathReveal 1.5s ease-out',
				'gradient-shift': 'gradientShift 3s ease-in-out infinite',
				'particle-float': 'particleFloat 20s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
