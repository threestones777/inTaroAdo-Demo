import { Outlet } from "react-router";
import { Link } from "react-router";
import useStore from "@/stores/store";
import { useSearchParams, useNavigate } from "react-router";
// import data from "./data.json";
import { useEffect } from "react";
import { Input, Table, Button } from "antd";
const { Search } = Input;
const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    render: (text) => (
      <Link to={`/list/${text}`} className="text-[#1677ff] hover:underline">
        {text}
      </Link>
    ),
  },
  {
    title: "姓名",
    dataIndex: "login",
    key: "login",
  },
  {
    title: "仓库地址",
    dataIndex: "html_url",
    key: "html_url",
  },
  {
    title: "node_id",
    dataIndex: "node_id",
    key: "node_id",
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
  },
];

export default function List() {
  const navigate = useNavigate();
  const { search, addSearch, tableData } = useStore();
  // searchParams 是一个 URLSearchParams 对象，具体请参考 MDN
  let [searchParams] = useSearchParams();
  // console.log(searchParams.get("type")); // 获取具体 query 参数
  // setLocalValue(searchParams.get("type"));
  // 页面初始化时获取数据
  const val = searchParams.get("type");
  useEffect(() => {
    const initData = async () => {
      addSearch(val);
    };
    setTimeout(() => {
      document.getElementById("ttt").value = val;
    });

    initData();
  }, [addSearch]); // fetchData是稳定的引用，不会导致无限循环

  const data = JSON.parse(JSON.stringify(tableData));
  const showData = search
    ? data.filter(
        (item) =>
          String(item.id).toLowerCase().includes(search.toLowerCase()) ||
          item.login.toLowerCase().includes(search.toLowerCase()) ||
          item.url.toLowerCase().includes(search.toLowerCase()) ||
          item.type.toLowerCase().includes(search.toLowerCase()) ||
          item.node_id.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  const onSearch = (value) => {
    console.log(search);
    // document.getElementById("ttt").value = search;
    navigate(`/list?type=${value}`);
    addSearch(value);
  };

  return (
    <div className="pt-50 w-[90%] mx-auto">
      <Search
        className="w-500 block mx-auto mb-10"
        placeholder={search}
        allowClear
        enterButton="搜索"
        id="ttt"
        size="large"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={showData}
        rowKey={(record) => record.id}
      />
    </div>
  );
}
