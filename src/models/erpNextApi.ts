// Re-export types for backward compatibility
export * from './types';

// This file maintains compatibility with existing ERPNext API structure
// while the main implementation now uses mock data from mockApiService

// For backward compatibility, re-export the mock API service as erpNextApi
export { mockApiService as erpNextApi } from './mockApiService';