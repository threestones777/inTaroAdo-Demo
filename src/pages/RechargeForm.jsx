import React, { useEffect } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useFormStore, useFormActions } from "@/stores/useRechargeStore";
import axios from "axios";

const { Option } = Select;

const RechargeForm = () => {
  const formData = useFormStore((state) => state.formData);
  const accounts = useFormStore((state) => state.accounts);
  const rechargeAccounts = useFormStore((state) => state.rechargeAccounts);
  const exchangeRate = useFormStore((state) => state.exchangeRate);
  const currentBalance = useFormStore((state) =>
    state.actions.getCurrentAccountBalance()
  );

  const { updateFormField, fullRecharge, validateRechargeAmount, submitForm } =
    useFormActions();

  const [form] = Form.useForm();
  const [submitting, setSubmitting] = React.useState(false);

  // 同步表单数据
  useEffect(() => {
    form.setFieldsValue(formData);
    axios
      .get("/api/users", {
        headers: {
          Authorization: "Bearer your-token-here",
          "Content-Type": "application/json",
          "Custom-Header": "custom-value",
        },
      })
      .then((response) => {
        console.log(response.data["users"]);
      });
  }, [formData, form]);

  // 提交处理
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      setSubmitting(true);
      const result = await submitForm();
      if (result.success) {
        message.success("充值成功");
      } else {
        message.error("充值失败");
      }
    } catch (error) {
      console.error("表单验证失败:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-430 mx-auto p-40 bg-white rounded-25 shadow-md mt-30 border-1 border-[#ccc] wow animate__animated animate__fadeInUp">
      <h2 className="text-xl font-semibold mb-4">账户充值</h2>

      <Form form={form} layout="vertical" initialValues={formData}>
        <Form.Item
          name="fromAccount"
          label="扣款账户"
          rules={[{ required: true, message: "请选择扣款账户" }]}
        >
          <Select
            placeholder="请选择扣款账户"
            onChange={(value) => {
              updateFormField("fromAccount", value);
              updateFormField("rechargeAmount", "");
              updateFormField("receivedAmount", "");
            }}
          >
            {accounts.map((account) => (
              <Option key={account.value} value={account.value}>
                {`${account.label} (余额: ¥${account.balance.toFixed(2)})`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="toAccount"
          label="充值账户"
          rules={[{ required: true, message: "请选择充值账户" }]}
        >
          <Select
            placeholder="请选择充值账户"
            onChange={(value) => updateFormField("toAccount", value)}
          >
            {rechargeAccounts.map((account) => (
              <Option key={account.value} value={account.value}>
                {account.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="rechargeAmount"
          label="充值金额"
          rules={[
            { required: true, message: "请输入充值金额" },
            { pattern: /^\d+(\.\d{1,2})?$/, message: "请输入有效的金额" },
            () => ({
              validator(_, value) {
                if (!value || parseFloat(value) > 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("充值金额必须大于0"));
              },
            }),
            () => ({
              validator(_, value) {
                return validateRechargeAmount(value)
                  .then(() => Promise.resolve())
                  .catch((err) => Promise.reject(new Error(err)));
              },
            }),
          ]}
        >
          <Input
            placeholder="请输入充值金额"
            onChange={(e) => updateFormField("rechargeAmount", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="receivedAmount"
          label="到账金额"
          rules={[
            { required: true, message: "请输入到账金额" },
            { pattern: /^\d+(\.\d{1,2})?$/, message: "请输入有效的金额" },
          ]}
        >
          <Input
            placeholder="请输入到账金额"
            onChange={(e) => updateFormField("receivedAmount", e.target.value)}
          />
        </Form.Item>

        <div className="text-sm text-gray-500 mb-4">
          费率: 1.1
          <span className="block mt-1">
            1充值金额 = {(1 / exchangeRate).toFixed(4)} 到账金额
          </span>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={fullRecharge}
            disabled={!formData.fromAccount || currentBalance <= 0}
          >
            全部充值
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={submitting}
            icon={submitting ? <LoadingOutlined /> : null}
          >
            {submitting ? "处理中..." : "确认充值"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RechargeForm;
