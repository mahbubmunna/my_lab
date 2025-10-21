/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss';

const config: Config = {
  // 1. Content Paths: Tells Tailwind where to find your classes (Crucial for Next.js App Router)

  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    './components/**/*.{js,ts,jsx,tsx,mdx}',

    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // 2. Dark Mode: Uses the 'class' strategy for next-themes compatibility

  darkMode: 'class', // Adding a placeholder string

  // 3. Theme Configuration

  theme: {
    container: {
      center: true,

      padding: '2rem',

      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      // **CRITICAL MAPPING:** Connects your CSS variables to Tailwind utility classes

      colors: {
        border: 'hsl(var(--border))',

        input: 'hsl(var(--input))',

        ring: 'hsl(var(--ring))',

        background: 'hsl(var(--background))',

        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',

          foreground: 'hsl(var(--primary-foreground))',
        },

        secondary: {
          DEFAULT: 'hsl(var(--secondary))',

          foreground: 'hsl(var(--secondary-foreground))',
        },

        muted: {
          DEFAULT: 'hsl(var(--muted))',

          foreground: 'hsl(var(--muted-foreground))',
        },

        // ... include all other custom colors (accent, destructive, card, etc.)

        accent: {
          DEFAULT: 'hsl(var(--accent))',

          foreground: 'hsl(var(--accent-foreground))',
        },

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',

          foreground: 'hsl(var(--destructive-foreground))',
        },

        card: {
          DEFAULT: 'hsl(var(--card))',

          foreground: 'hsl(var(--card-foreground))',
        },
      },

      borderRadius: {
        lg: `var(--radius)`,

        md: `calc(var(--radius) - 2px)`,

        sm: `calc(var(--radius) - 4px)`,
      },
    },
  },

  // 4. Plugins (e.g., for Tailwind Typography, which you might use later for the blog)

  plugins: [
    // require("tailwindcss-animate"), // If you use shadcn/ui or similar
  ],
};

export default config;
