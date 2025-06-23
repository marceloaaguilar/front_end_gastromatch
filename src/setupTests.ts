import '@testing-library/jest-dom';
import React from 'react';

// Polyfill para TextEncoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Mock para import.meta.env
// global.import = {
//   meta: {
//     env: {
//       VITE_SERVER_URL: 'http://localhost:3000',
//     },
//   },
// }; 