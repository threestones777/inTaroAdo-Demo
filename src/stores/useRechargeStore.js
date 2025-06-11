import { create } from "zustand";

const useStore = create((set, get) => ({
  // 表单数据
  formData: {
    fromAccount: "", // 扣款账户
    toAccount: "", // 充值专户
    rechargeAmount: "", // 充值金额
    receivedAmount: "", // 到账金额
  },

  // 费率
  exchangeRate: 1.1,

  // Mock 数据
  accounts: [
    { value: "account1", label: "主账户", balance: 10000 },
    { value: "account2", label: "备用账户", balance: 5000 },
  ],

  rechargeAccounts: [
    { value: "recharge1", label: "账户666" },
    { value: "recharge2", label: "账户888" },
  ],

  // 业务逻辑方法
  actions: {
    // 获取当前账户余额
    getCurrentAccountBalance: () => {
      const { formData, accounts } = get();
      const account = accounts.find(
        (acc) => acc.value === formData.fromAccount
      );
      return account ? account.balance : 0;
    },

    // 更新表单字段
    updateFormField: (field, value) => {
      set((state) => ({
        formData: {
          ...state.formData,
          [field]: value,
        },
      }));

      // 金额字段自动计算
      if (field === "rechargeAmount") {
        get().actions.calculateReceivedAmount(value);
      } else if (field === "receivedAmount") {
        get().actions.calculateRechargeAmount(value);
      }
    },

    // 计算到账金额
    calculateReceivedAmount: (rechargeAmount) => {
      const numValue = parseFloat(rechargeAmount) || 0;
      const receivedAmount = (numValue / get().exchangeRate).toFixed(2);
      set((state) => ({
        formData: {
          ...state.formData,
          receivedAmount,
        },
      }));
    },

    // 计算充值金额
    calculateRechargeAmount: (receivedAmount) => {
      const numValue = parseFloat(receivedAmount) || 0;
      const rechargeAmount = (numValue * get().exchangeRate).toFixed(2);
      set((state) => ({
        formData: {
          ...state.formData,
          rechargeAmount,
        },
      }));
    },

    // 全部充值
    fullRecharge: () => {
      const balance = get().actions.getCurrentAccountBalance();
      if (balance <= 0) return;

      const rechargeAmount = balance.toFixed(2);
      set((state) => ({
        formData: {
          ...state.formData,
          rechargeAmount,
          receivedAmount: (balance / get().exchangeRate).toFixed(2),
        },
      }));
    },

    // 验证充值金额
    validateRechargeAmount: (value) => {
      const balance = get().actions.getCurrentAccountBalance();
      const numValue = parseFloat(value) || 0;

      if (numValue > balance) {
        return Promise.reject(
          `充值金额不能超过账户余额 ¥${balance.toFixed(2)}`
        );
      }
      return Promise.resolve();
    },

    // 提交表单
    submitForm: async () => {
      const { formData } = get();
      console.log("提交表单:", formData);
      // 模拟API调用
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    },
  },
}));

// 导出hook和actions
export const useFormStore = (selector) => useStore(selector);
export const useFormActions = () => useStore((state) => state.actions);
