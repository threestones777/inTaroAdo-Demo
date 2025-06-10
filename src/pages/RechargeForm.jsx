import { Select, Input, Button, Form, Space, message } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import useRechargeStore from "@/useRechargeStore";

const { Option } = Select;

export default function RechargeForm() {
  const {
    debitAccounts,
    rechargeAccounts,
    formData,
    errors,
    updateFormField,
    calculateReceivedAmount,
    setFullAmount,
    submitForm,
  } = useRechargeStore();

  // 处理充值金额变化
  const handleAmountChange = (e) => {
    const value = e.target.value;
    updateFormField("amount", value);

    // 自动计算到账金额
    if (value) {
      const received = calculateReceivedAmount(value);
      updateFormField("receivedAmount", received);
    } else {
      updateFormField("receivedAmount", "");
    }
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitForm()) {
      message.success("充值提交成功");
      // 这里可以添加提交成功后的逻辑
    }
  };

  return (
    <div className="max-w-md mx-auto p-16 mt-50 border-1 border-[#ccc] rounded-20 shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-center">账户充值</h2>

      <Form layout="vertical" onSubmitCapture={handleSubmit}>
        {/* 扣款账户选择 */}
        <Form.Item
          label="扣款账户"
          validateStatus={errors.debitAccount ? "error" : ""}
          help={errors.debitAccount}
        >
          <Select
            placeholder="请选择扣款账户"
            value={formData.debitAccount}
            onChange={(value) => updateFormField("debitAccount", value)}
            className="w-full"
          >
            {debitAccounts.map((account) => (
              <Option key={account.id} value={account.id}>
                {account.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* 充值专户选择 */}
        <Form.Item
          label="充值专户"
          validateStatus={errors.rechargeAccount ? "error" : ""}
          help={errors.rechargeAccount}
        >
          <Select
            placeholder="请选择充值专户"
            value={formData.rechargeAccount}
            onChange={(value) => updateFormField("rechargeAccount", value)}
            className="w-full"
          >
            {rechargeAccounts.map((account) => (
              <Option key={account.id} value={account.id}>
                {account.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* 充值金额 */}
        <Form.Item
          label="充值金额"
          validateStatus={errors.amount ? "error" : ""}
          help={errors.amount}
        >
          <div className="flex items-center">
            <Input
              type="number"
              placeholder="请输入充值金额"
              value={formData.amount}
              onChange={handleAmountChange}
              className="flex-1"
            />
            <Button
              type="primary"
              icon={<ThunderboltOutlined />}
              onClick={setFullAmount}
              className="ml-2"
            >
              全部充值
            </Button>
          </div>
        </Form.Item>

        {/* 到账金额 */}
        <Form.Item label="到账金额 (费率: 1.1)">
          <Input
            placeholder="自动计算"
            value={formData.receivedAmount}
            readOnly
            className="bg-gray-100"
          />
        </Form.Item>

        {/* 提交按钮 */}
        <Form.Item className="mt-6">
          <Button type="primary" htmlType="submit" block size="large">
            确认充值
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
