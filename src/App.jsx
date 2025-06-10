import { useEffect } from "react";
import WOW from "wow.js";
import "animate.css";
import { Link } from "react-router";
import { Outlet } from "react-router";
import useStore from "@/store";
import { Button, Dropdown, Space } from "antd";

const items = [
  {
    key: "1",
    label: (
      <Link className="" to={`/list`}>
        简单
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link className="" to={`/listmore`}>
        复杂
      </Link>
    ),
  },
];

export default function App() {
  const { search, addSearch, fetchData } = useStore();
  // 页面初始化时获取数据
  useEffect(() => {
    const initData = async () => {
      try {
        await fetchData(
          "https://api.github.com/search/users?q=threestones&per_page=10"
        );
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    initData();
  }, [fetchData]); // fetchData是稳定的引用，不会导致无限循环
  return (
    <div>
      <nav className="fixed z-50 w-full h-90 bg-white shadow-lg text-center flex justify-center">
        <Link
          className="w-200 text-36 leading-48 block py-24 hover:cursor-pointer"
          to="/"
          onClick={() => {
            addSearch("");
          }}
        >
          首页
        </Link>
        <Dropdown menu={{ items }} placement="bottom">
          {/* <Button
            type="text"
            
          >
            列表
          </Button> */}
          <a
            onClick={(e) => e.preventDefault()}
            className="w-200 text-36 leading-48 block py-24 hover:cursor-pointer"
          >
            <Space>列表</Space>
          </a>
        </Dropdown>
        <Link
          className="w-200 text-36 leading-48 block py-24 hover:cursor-pointer"
          to={`/form`}
        >
          表单
        </Link>
      </nav>
      <div className="pt-100 z-20">
        <Outlet />
      </div>
    </div>
  );
}
