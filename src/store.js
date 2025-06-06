import { create } from "zustand";
import { persist } from "zustand/middleware";

let store = (set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  search: "",
  addSearch: (value) => set({ search: value }),
  tableData: [],
  fetchData: async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    set({ tableData: json.items });
  },
});
// persist the created state
store = persist(store, { name: "basket" });
// create the store
const useStore = create(store);
export default useStore;
