/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

// Tailwind CSS color palette
const colors = {
  // Grayscale
  black: "black",
  white: "white",
  gray: {
    50: "gray-50",
    100: "gray-100",
    200: "gray-200",
    300: "gray-300",
    400: "gray-400",
    500: "gray-500",
    600: "gray-600",
    700: "gray-700",
    800: "gray-800",
    900: "gray-900",
  },
  coolGray: {
    50: "coolGray-50",
    100: "coolGray-100",
    200: "coolGray-200",
    300: "coolGray-300",
    400: "coolGray-400",
    500: "coolGray-500",
    600: "coolGray-600",
    700: "coolGray-700",
    800: "coolGray-800",
    900: "coolGray-900",
  },
  warmGray: {
    50: "warmGray-50",
    100: "warmGray-100",
    200: "warmGray-200",
    300: "warmGray-300",
    400: "warmGray-400",
    500: "warmGray-500",
    600: "warmGray-600",
    700: "warmGray-700",
    800: "warmGray-800",
    900: "warmGray-900",
  },
  trueGray: {
    50: "trueGray-50",
    100: "trueGray-100",
    200: "trueGray-200",
    300: "trueGray-300",
    400: "trueGray-400",
    500: "trueGray-500",
    600: "trueGray-600",
    700: "trueGray-700",
    800: "trueGray-800",
    900: "trueGray-900",
  },
  // Primary Colors
  red: {
    50: "red-50",
    100: "red-100",
    200: "red-200",
    300: "red-300",
    400: "red-400",
    500: "red-500",
    600: "red-600",
    700: "red-700",
    800: "red-800",
    900: "red-900",
  },
  yellow: {
    50: "yellow-50",
    100: "yellow-100",
    200: "yellow-200",
    300: "yellow-300",
    400: "yellow-400",
    500: "yellow-500",
    600: "yellow-600",
    700: "yellow-700",
    800: "yellow-800",
    900: "yellow-900",
  },
  green: {
    50: "green-50",
    100: "green-100",
    200: "green-200",
    300: "green-300",
    400: "green-400",
    500: "green-500",
    600: "green-600",
    700: "green-700",
    800: "green-800",
    900: "green-900",
  },
  blue: {
    50: "blue-50",
    100: "blue-100",
    200: "blue-200",
    300: "blue-300",
    400: "blue-400",
    500: "blue-500",
    600: "blue-600",
    700: "blue-700",
    800: "blue-800",
    900: "blue-900",
  },
  indigo: {
    50: "indigo-50",
    100: "indigo-100",
    200: "indigo-200",
    300: "indigo-300",
    400: "indigo-400",
    500: "indigo-500",
    600: "indigo-600",
    700: "indigo-700",
    800: "indigo-800",
    900: "indigo-900",
  },
  purple: {
    50: "purple-50",
    100: "purple-100",
    200: "purple-200",
    300: "purple-300",
    400: "purple-400",
    500: "purple-500",
    600: "purple-600",
    700: "purple-700",
    800: "purple-800",
    900: "purple-900",
  },
  pink: {
    50: "pink-50",
    100: "pink-100",
    200: "pink-200",
    300: "pink-300",
    400: "pink-400",
    500: "pink-500",
    600: "pink-600",
    700: "pink-700",
    800: "pink-800",
    900: "pink-900",
  },
  cyan: {
    50: "cyan-50",
    100: "cyan-100",
    200: "cyan-200",
    300: "cyan-300",
    400: "cyan-400",
    500: "cyan-500",
    600: "cyan-600",
    700: "cyan-700",
    800: "cyan-800",
    900: "cyan-900",
  },
  teal: {
    50: "teal-50",
    100: "teal-100",
    200: "teal-200",
    300: "teal-300",
    400: "teal-400",
    500: "teal-500",
    600: "teal-600",
    700: "teal-700",
    800: "teal-800",
    900: "teal-900",
  },
  emerald: {
    50: "emerald-50",
    100: "emerald-100",
    200: "emerald-200",
    300: "emerald-300",
    400: "emerald-400",
    500: "emerald-500",
    600: "emerald-600",
    700: "emerald-700",
    800: "emerald-800",
    900: "emerald-900",
  },
  lime: {
    50: "lime-50",
    100: "lime-100",
    200: "lime-200",
    300: "lime-300",
    400: "lime-400",
    500: "lime-500",
    600: "lime-600",
    700: "lime-700",
    800: "lime-800",
    900: "lime-900",
  },
  amber: {
    50: "amber-50",
    100: "amber-100",
    200: "amber-200",
    300: "amber-300",
    400: "amber-400",
    500: "amber-500",
    600: "amber-600",
    700: "amber-700",
    800: "amber-800",
    900: "amber-900",
  },
  orange: {
    50: "orange-50",
    100: "orange-100",
    200: "orange-200",
    300: "orange-300",
    400: "orange-400",
    500: "orange-500",
    600: "orange-600",
    700: "orange-700",
    800: "orange-800",
    900: "orange-900",
  },
  rose: {
    50: "rose-50",
    100: "rose-100",
    200: "rose-200",
    300: "rose-300",
    400: "rose-400",
    500: "rose-500",
    600: "rose-600",
    700: "rose-700",
    800: "rose-800",
    900: "rose-900",
  },
};

// Function to generate class names
const generateBgClasses = (colors) => {
  const classes = [];

  for (const color in colors) {
    if (typeof colors[color] === "string") {
      classes.push(`[&>*>*]:bg-${colors[color]}`);
    } else {
      for (const shade in colors[color]) {
        classes.push(`[&>*>*]:bg-${colors[color][shade]}`);
      }
    }
  }

  return classes;
};

const bgClasses = generateBgClasses(colors);

// Write to a file
fs.writeFileSync(
  "tailwind-bg-classes.js",
  `module.exports = ${JSON.stringify(bgClasses, null, 2)};`,
  "utf8"
);

console.log("Tailwind background color classes have been generated.");
