import { Button, Card, Input } from "antd";
import useStore from "@/stores/store";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
export default function Home() {
  const [timeString, setTimeString] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeString(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { count, increment, decrement, reset } = useStore();
  const xxx = dayjs();
  const diff = dayjs("2026-02-16").diff(dayjs(), "day");
  return (
    <div className="">
      <div className="flex justify-around">
        <Card
          title="dayjs"
          hoverable
          className="w-430 rounded-30 border-1 border-[#73bea0] shadow-lg mt-50 hover:border-[#4f9c83] text-24"
          styles={{
            header: {
              background: "#437371",
              color: "#c4f8e7",
              fontSize: "36px",
              borderRadius: "30px 30px 0 0",
            },
          }}
        >
          <p>
            日期：
            {timeString}
          </p>
          <p>周末：{xxx.endOf("week").format("YYYY-MM-DD")}</p>
          <p>过年：剩{diff}天</p>
        </Card>
        <Card
          title="Zustand"
          variant="borderless"
          className="w-430 rounded-30 border-1 border-[#73bea0] shadow-lg mt-50 hover:border-[#4f9c83] text-24"
          styles={{
            header: {
              background: "#437371",
              color: "#c4f8e7",
              fontSize: "36px",
              borderRadius: "30px 30px 0 0",
            },
          }}
        >
          <div className="flex justify-around">
            <div>
              <p>
                <Button
                  type="primary"
                  className="w-100 my-button"
                  onClick={increment}
                >
                  +
                </Button>
              </p>
              <p>
                <Button
                  type="primary"
                  className="w-100 my-button"
                  onClick={decrement}
                >
                  -
                </Button>
              </p>
              <p>
                <Button
                  type="primary"
                  className="w-100 my-button"
                  onClick={reset}
                >
                  reset
                </Button>

                <Input
                  className="mt-10"
                  placeholder="Basic usage"
                  value={count}
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
