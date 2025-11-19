import { api } from './api';

export const analyticsService = {
  get: (from?: string, to?: string) => {
    if (from && to) return api.getAnalytics(from, to);
    // fallback: return empty array if no range provided
    return Promise.resolve([] as any);
  }
};
