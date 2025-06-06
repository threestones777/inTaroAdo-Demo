import { Button, Card, Input } from "antd";
import useStore from "@/store";
import React from "react";
import { ReactReader } from "react-reader";
import dayjs from "dayjs";
export default function Home() {
  const { count, increment, decrement, reset } = useStore();
  const xxx = dayjs();
  const diff = dayjs("2026-02-16").diff(dayjs(), "day");
  return (
    <div className="">
      <div className="flex justify-around">
        <Card
          title="dayjs"
          variant="borderless"
          className="w-430 rounded-30 border-1 border-[#ccc] shadow-lg mt-50"
        >
          <p>日期：{xxx.format("YYYY-MM-DD HH:mm:ss")}</p>
          <p>周末：{xxx.endOf("week").format("YYYY-MM-DD")}</p>
          <p>过年：剩{diff}天</p>
        </Card>
        <Card
          title="Zustand"
          variant="borderless"
          className="w-430 rounded-30 border-1 border-[#ccc] shadow-lg mt-50"
        >
          <div className="flex justify-around">
            <div>
              <p>
                <Button type="primary" className="w-100" onClick={increment}>
                  +
                </Button>
              </p>
              <p>
                <Button type="primary" className="w-100" onClick={decrement}>
                  -
                </Button>
              </p>
              <p>
                <Button type="primary" className="w-100" onClick={reset}>
                  reset
                </Button>

                <Input
                  className="mt-10"
                  placeholder="Basic usage"
                  defaultValue={count}
                />
              </p>
            </div>
            <div>
              <h1>Count: {count}</h1>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
