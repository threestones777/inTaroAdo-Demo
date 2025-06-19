import { Button, Card, Input, InputNumber, Carousel } from "antd";
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
      {/* <Carousel
        arrows
        className="w-[80%] mx-auto mt-50"
        autoplay={{ dotDuration: true }}
        autoplaySpeed={4000}
      >
        <div>
          <h3>
            <img src="/50.png" className="w-[80%] mx-auto" />
          </h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel> */}
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
          <div className="flex justify-between">
            <div className="w-[70%]">
              <div>
                <Button className="w-100" onClick={increment}>
                  +
                </Button>
              </div>
              <div>
                <Button className="w-100" onClick={decrement}>
                  -
                </Button>
              </div>
              <div>
                <Button className="w-100" onClick={reset}>
                  reset
                </Button>

                <Input
                  className="mt-10"
                  placeholder="Basic usage"
                  value={count}
                />
                <InputNumber
                  className="mt-10"
                  addonBefore={<i className="bi bi-currency-dollar"></i>}
                  min={1}
                  max={10}
                  defaultValue={count}
                />
              </div>
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
