import { useEffect } from "react";
import WOW from "wow.js";
import "animate.css";
import { Link } from "react-router";
import { Outlet } from "react-router";
import useStore from "@/stores/store";
import { Badge, FloatButton, ConfigProvider } from "antd";

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
      <nav className="fixed z-50 w-full h-90 bg-[linear-gradient(to_bottom,#1c3c31_0%,#437371_100%)] text-[#c4f8e7] shadow-lg text-center flex justify-start">
        <Badge.Ribbon text="6" color="red">
          <Link
            className="mt-20 ml-80 flex"
            to="/"
            onClick={() => {
              addSearch("");
            }}
          >
            <img src="/logo.jpg" className="w-50 h-50 rounded-10" alt="" />
          </Link>
        </Badge.Ribbon>
        <div className="ml-120 text-30 leading-48 flex">
          <Link
            className="pr-50 py-24 hover:cursor-pointer"
            to={`${!search ? "/list" : "/list?type=" + search}`}
          >
            列表1
          </Link>
          <Link className="pr-50 py-24 hover:cursor-pointer" to={`/listmore`}>
            列表2
          </Link>
          <Link className="pr-50 py-24 hover:cursor-pointer" to={`/form`}>
            充值
          </Link>
        </div>
      </nav>
      <div className="pt-100 min-h-screen z-20 bg-[linear-gradient(to_bottom,#98c0c9_0%,#c4f8e7_100%)]">
        <ConfigProvider
          theme={{
            components: {
              FloatButton: {
                colorPrimary: "#4f9c83",
                colorPrimaryHover: "#73bea0",
                algorithm: true, // 启用算法
              },
              Button: {
                colorPrimary: "#4f9c83",
                colorPrimaryHover: "#73bea0",
                algorithm: true, // 启用算法
              },
              // Input: {
              //   colorPrimary: "#eb2f96",
              //   algorithm: true, // 启用算法
              // },
            },
          }}
        >
          <Outlet />
          <FloatButton
            shape="circle"
            type="primary"
            icon={<i className="bi bi-8-circle-fill"></i>}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
