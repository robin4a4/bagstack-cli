/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        1: '1px',
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        32: '32px',
        38: '38px',
        40: '40px',
        42: '42px',
        48: '48px',
        52: '52px',
        58: '58px',
        64: '64px',
        72: '72px',
        96: '96px',
        112: '112px',
        132: '132px',
      },
      fontSize: {
        1: '1px',
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        32: '32px',
        38: '38px',
        40: '40px',
        42: '42px',
        48: '48px',
        52: '52px',
        58: '58px',
        64: '64px',
      },
      borderRadius: {
        DEFAULT: '4px',
        md: '8px',
        full: '9999px',
      },
      animation: {
        slideIn: 'slideIn .2s ease-in-out',
        slideOut: 'slideOut .2s ease-in-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
