/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter Display"', '"Inter"', 'Arial', 'sans-serif'],
        mono: ['"Chivo Mono"', 'monospace'],
      },
      colors: {
        ink: '#1e1e1e',
        white: '#ffffff',
        valuation: '#F093A2',
        growth: '#8FD8C8',
        profit: '#F4B183',
        // muted gray for secondary text only
        'mid-gray': '#5a6271',
        border: '#d0d8e4',
        lavender: '#e5daf6',
        mint: '#cfffb2',
        rose: '#ffc9c9',
        peach: '#fedca6',
        accent: '#00ff88',
        // shadcn compatibility
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
      },
      borderRadius: {
        pill: '50px',
        'card-lg': '40px',
        card: '32px',
        'card-sm': '20px',
        input: '12px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        section: '120px',
        'section-sm': '80px',
      },
      gap: {
        xl: '50px',
        lg: '40px',
        md: '32px',
        sm: '20px',
        xs: '12px',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        shimmer: 'shimmer 1.4s ease infinite',
        marquee: 'marquee 25s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
