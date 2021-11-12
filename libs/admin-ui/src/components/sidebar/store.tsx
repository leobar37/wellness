import create from 'zustand';
import { combine } from 'zustand/middleware';
export const useSidebarStore = create((set) => {
  return {
    open: false,
    toogleSidebar: () => {
      set({});
    },
  };
});
