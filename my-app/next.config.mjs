/** @type {import('next').NextConfig} */
require('dotenv').config();
module.exports = {
  env: {
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
  },
};
