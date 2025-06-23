export function getServerUrl(): string {
  if (process.env && process.env.VITE_SERVER_URL) {
    return process.env.VITE_SERVER_URL;
  }
  throw new Error('VITE_SERVER_URL is not defined in environment variables');
} 