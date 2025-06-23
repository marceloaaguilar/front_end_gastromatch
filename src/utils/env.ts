export function getServerUrl(): string {
  if (import.meta.env && import.meta.env.VITE_SERVER_URL) {
    return import.meta.env.VITE_SERVER_URL as string;
  }
  throw new Error('VITE_SERVER_URL is not defined in environment variables');
} 