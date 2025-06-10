// stores/useRechargeStore.js
import { create } from "zustand";

const useRechargeStore = create((set) => ({
  // 扣款账户列表
  debitAccounts: [
    { id: "1", name: "主账户 (余额: 10,000.00)", balance: 10000 },
    { id: "2", name: "备用账户 (余额: 5,000.00)", balance: 5000 },
  ],

  // 充值专户列表
  rechargeAccounts: [
    { id: "r1", name: "USD账户" },
    { id: "r2", name: "EUR账户" },
    { id: "r3", name: "CNY账户" },
  ],

  // 表单数据
  formData: {
    debitAccount: null, // 扣款账户
    rechargeAccount: null, // 充值专户
    amount: "", // 充值金额
    receivedAmount: "", // 到账金额
  },

  // 表单错误
  errors: {},

  // 更新表单字段
  updateFormField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
      errors: { ...state.errors, [field]: undefined }, // 清除该字段的错误
    })),

  // 计算到账金额
  calculateReceivedAmount: (amount) => {
    if (!amount) return "";
    const rate = 1.1; // 转换费率
    return (parseFloat(amount) / rate).toFixed(2);
  },

  // 设置全部充值
  setFullAmount: () =>
    set((state) => {
      const selectedAccount = state.debitAccounts.find(
        (acc) => acc.id === state.formData.debitAccount
      );
      if (!selectedAccount) return state;

      const amount = selectedAccount.balance.toString();
      return {
        formData: {
          ...state.formData,
          amount,
          receivedAmount: state.calculateReceivedAmount(amount),
        },
      };
    }),

  // 验证表单
  validateForm: () => {
    let isValid = true;
    const errors = {};
    const { debitAccount, rechargeAccount, amount } =
      useRechargeStore.getState().formData;

    if (!debitAccount) {
      errors.debitAccount = "请选择扣款账户";
      isValid = false;
    }

    if (!rechargeAccount) {
      errors.rechargeAccount = "请选择充值专户";
      isValid = false;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      errors.amount = "请输入有效的充值金额";
      isValid = false;
    } else {
      const selectedAccount = useRechargeStore
        .getState()
        .debitAccounts.find((acc) => acc.id === debitAccount);
      if (selectedAccount && parseFloat(amount) > selectedAccount.balance) {
        errors.amount = "充值金额不能超过账户余额";
        isValid = false;
      }
    }

    set({ errors });
    return isValid;
  },

  // 提交表单
  submitForm: () => {
    if (!useRechargeStore.getState().validateForm()) {
      return false;
    }

    // 这里可以添加实际的提交逻辑
    const { formData } = useRechargeStore.getState();
    console.log("提交表单:", formData);
    return true;
  },
}));

export default useRechargeStore;
