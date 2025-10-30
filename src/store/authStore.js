import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  
  setToken: (token) => set({ token }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ token: null, refreshToken: null, user: null, isAuthenticated: false }),
}));

export default useAuthStore;

