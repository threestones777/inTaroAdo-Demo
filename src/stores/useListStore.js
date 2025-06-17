import { create } from "zustand";
import dayjs from "dayjs";

const useListStore = create((set) => ({
  data: [],
  loading: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  searchParams: {
    dateRange: [],
    keyword: "",
    status: undefined,
  },

  // 获取数据
  fetchData: async (params) => {
    set({ loading: true });
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // 模拟API调用
      const { current, pageSize } = params.pagination;
      const { dateRange, keyword, status } = params.searchParams;

      // 这里实际项目中替换为真实API调用
      const mockData = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `卡-${dayjs().subtract(i, "day").format("X").slice(0, 7)}`,
        status: i % 3 === 0 ? "active" : i % 3 === 1 ? "frozen" : "inactive",
        amount: Math.random() * 10000,
        date: dayjs().subtract(i, "day").format("YYYY-MM-DD HH:mm:ss"),
        description: `这是卡-${i + 1} 的详细描述，包含无`,
      })).filter((item) => {
        // 模拟过滤
        if (keyword && !item.name.includes(keyword)) return false;
        if (status && item.status !== status) return false;
        if (dateRange && dateRange.length === 2) {
          const itemDate = dayjs(item.date);
          if (itemDate.isBefore(dateRange[0]) || itemDate.isAfter(dateRange[1]))
            return false;
        }
        return true;
      });

      set({
        data: mockData.slice((current - 1) * pageSize, current * pageSize),
        pagination: {
          ...params.pagination,
          total: mockData.length,
        },
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.error("获取数据失败:", error);
    }
  },

  // 更新搜索参数
  setSearchParams: (params) => set({ searchParams: params }),

  // 更新分页
  setPagination: (pagination) => set({ pagination }),

  // 删除项目
  deleteItem: (id) => {
    set({ loading: true });
    set((state) => ({
      data: state.data.filter((item) => item.id !== id),
      pagination: {
        ...state.pagination,
        total: state.pagination.total - 1,
      },
    }));
    setTimeout(() => {
      set({ loading: false });
    }, 500);
  },

  // 批量删除
  batchDelete: (ids) => {
    set({ loading: true });
    set((state) => ({
      data: state.data.filter((item) => !ids.includes(item.id)),
      pagination: {
        ...state.pagination,
        total: state.pagination.total - ids.length,
      },
    }));
    setTimeout(() => {
      set({ loading: false });
    }, 500);
  },

  // 更新状态
  updateStatus: (id, status) => {
    set({ loading: true });
    set((state) => ({
      data: state.data.map((item) =>
        item.id === id ? { ...item, status } : item
      ),
    }));
    setTimeout(() => {
      set({ loading: false });
    }, 500);
  },

  // 批量更新状态
  batchUpdateStatus: (ids, status) => {
    set({ loading: true });
    set((state) => ({
      data: state.data.map((item) =>
        ids.includes(item.id) ? { ...item, status } : item
      ),
    }));
    setTimeout(() => {
      set({ loading: false });
    }, 500);
  },
}));

export default useListStore;
