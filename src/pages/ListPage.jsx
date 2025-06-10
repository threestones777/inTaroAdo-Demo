// ListPage.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  DatePicker,
  Input,
  Select,
  Button,
  Space,
  Tag,
  Divider,
  Drawer,
  Popconfirm,
  message,
  Card,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import useListStore from "@/useListStore";

const { RangePicker } = DatePicker;
const { Option } = Select;

const statusOptions = [
  { value: "active", label: "活跃" },
  { value: "inactive", label: "未激活" },
  { value: "frozen", label: "冻结" },
];

const ListPage = () => {
  const {
    data,
    loading,
    pagination,
    searchParams,
    fetchData,
    setSearchParams,
    setPagination,
    deleteItem,
    batchDelete,
    updateStatus,
    batchUpdateStatus,
  } = useListStore();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // 初始化加载数据
  useEffect(() => {
    fetchData({ pagination, searchParams });
  }, []);

  // 处理表格变化
  const handleTableChange = (pagination) => {
    setPagination(pagination);
    fetchData({ pagination, searchParams });
  };

  // 搜索
  const handleSearch = () => {
    setPagination({ ...pagination, current: 1 });
    fetchData({ pagination: { ...pagination, current: 1 }, searchParams });
  };

  // 重置
  const handleReset = () => {
    const resetParams = { dateRange: [], keyword: "", status: undefined };
    setSearchParams(resetParams);
    setPagination({ ...pagination, current: 1 });
    fetchData({
      pagination: { ...pagination, current: 1 },
      searchParams: resetParams,
    });
  };

  // 查看详情
  const handleViewDetail = (record) => {
    setCurrentItem(record);
    setDrawerVisible(true);
  };

  // 删除确认
  const handleDelete = async (id) => {
    try {
      // 实际项目中这里调用API
      deleteItem(id);
      message.success("删除成功");
    } catch (error) {
      message.error("删除失败", error);
    }
  };

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("请至少选择一项");
      return;
    }
    batchDelete(selectedRowKeys);
    setSelectedRowKeys([]);
    message.success("批量删除成功");
  };

  // 批量更新状态
  const handleBatchUpdateStatus = (status) => {
    if (selectedRowKeys.length === 0) {
      message.warning("请至少选择一项");
      return;
    }
    batchUpdateStatus(selectedRowKeys, status);
    setSelectedRowKeys([]);
    message.success("批量更新状态成功");
  };

  // 渲染状态标签
  const renderStatusTag = (status) => {
    let color = "";
    let text = "";

    switch (status) {
      case "active":
        color = "green";
        text = "活跃";
        break;
      case "inactive":
        color = "orange";
        text = "未激活";
        break;
      case "frozen":
        color = "red";
        text = "冻结";
        break;
      default:
        color = "gray";
        text = "未知";
    }

    return <Tag color={color}>{text}</Tag>;
  };

  // 表格列定义
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      fixed: "left",
    },
    {
      title: "名称",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      render: (status) => renderStatusTag(status),
    },
    {
      title: "金额",
      dataIndex: "amount",
      width: 120,
      render: (amount) => Number(amount).toFixed(4),
    },
    {
      title: "日期时间",
      dataIndex: "date",
      width: 180,
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>

          <Select
            defaultValue={record.status}
            style={{ width: 100 }}
            onChange={(value) => updateStatus(record.id, value)}
          >
            {statusOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>

          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  return (
    <div className="p-4">
      <Card title="" className="my-10">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">日期范围</label>
              <RangePicker
                style={{ width: "100%" }}
                value={
                  searchParams.dateRange.length === 2
                    ? [
                        dayjs(searchParams.dateRange[0]),
                        dayjs(searchParams.dateRange[1]),
                      ]
                    : null
                }
                onChange={(dates) =>
                  setSearchParams({
                    ...searchParams,
                    dateRange: dates
                      ? [dates[0].toDate(), dates[1].toDate()]
                      : [],
                  })
                }
                showTime
              />
            </div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">关键词</label>
              <Input
                placeholder="请输入关键词"
                value={searchParams.keyword}
                onChange={(e) => {
                  setSearchParams({ ...searchParams, keyword: e.target.value });
                  // handleSearch();
                }}
              />
            </div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">状态</label>
              <Select
                style={{ width: "100%" }}
                placeholder="请选择状态"
                value={searchParams.status}
                onChange={(value) =>
                  setSearchParams({ ...searchParams, status: value })
                }
                allowClear
              >
                {statusOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>
        </Row>

        <Divider />

        <div className="flex justify-end">
          <Space>
            <Button onClick={handleReset} icon={<ReloadOutlined />}>
              重置
            </Button>
            <Button
              type="primary"
              onClick={handleSearch}
              icon={<SearchOutlined />}
            >
              搜索
            </Button>
          </Space>
        </div>
      </Card>
      {/* selectedRowKeys */}
      <Card
        title="数据列表"
        className="mb-4"
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => {
                handleBatchDelete();
              }}
              disabled={!selectedRowKeys.length}
              icon={<SearchOutlined />}
            >
              批量删除
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleBatchUpdateStatus("frozen");
              }}
              disabled={!selectedRowKeys.length}
              icon={<SearchOutlined />}
            >
              批量冻结
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleBatchUpdateStatus("active");
              }}
              disabled={!selectedRowKeys.length}
              icon={<SearchOutlined />}
            >
              批量解冻
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          rowKey="id"
          dataSource={data}
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          onChange={handleTableChange}
          rowSelection={rowSelection}
          scroll={{ x: 1500 }}
          bordered
        />
      </Card>

      <Drawer
        title="详情"
        width={600}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        {currentItem && (
          <div>
            <div className="mb-4">
              <h3 className="font-medium">基本信息</h3>
              <Divider className="my-2" />
              <Row gutter={16}>
                <Col span={12}>
                  <p>
                    <span className="text-gray-500">ID:</span> {currentItem.id}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <span className="text-gray-500">名称:</span>{" "}
                    {currentItem.name}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <span className="text-gray-500">状态:</span>{" "}
                    {renderStatusTag(currentItem.status)}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <span className="text-gray-500">金额:</span>{" "}
                    {Number(currentItem.amount).toFixed(4)}
                  </p>
                </Col>
                <Col span={24}>
                  <p>
                    <span className="text-gray-500">日期:</span>{" "}
                    {currentItem.date}
                  </p>
                </Col>
              </Row>
            </div>

            <div>
              <h3 className="font-medium">描述</h3>
              <Divider className="my-7" />
              <p>{currentItem.description}</p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ListPage;
