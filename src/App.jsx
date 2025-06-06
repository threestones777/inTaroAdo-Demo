import { useEffect } from "react";
import WOW from "wow.js";
import "animate.css";
import { Link } from "react-router";
import { Outlet } from "react-router";
import useStore from "@/store";

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
      <nav className="h-90 shadow-lg text-center flex justify-center">
        <Link
          className="w-200 text-36 leading-48 block py-24 hover:cursor-pointer"
          to="/"
          onClick={() => {
            addSearch("");
          }}
        >
          首页
        </Link>
        <Link
          className="w-200 text-36 leading-48 block py-24 hover:cursor-pointer"
          to={`${!search ? "/list" : "/list?type=" + search}`}
        >
          列表
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}
