import { Card } from "antd";
import useStore from "@/stores/store";
import { useParams } from "react-router";

export default function IdInfo() {
  const { tableData } = useStore();
  let params = useParams();
  const id = params.id;
  console.log("xxx", tableData);
  const data = JSON.parse(JSON.stringify(tableData));
  const msg = data.find((item) => item.id === Number(id));
  console.log("**********", msg);
  return (
    <div className="">
      {msg ? (
        <Card
          title={msg.id}
          variant="borderless"
          className="w-430 rounded-30 border-1 border-[#ccc] shadow-lg mt-50 mx-auto"
        >
          <p>姓名：{msg.login}</p>
          <p>
            地址：
            <a
              className="text-[#1677ff] hover:underline"
              href={msg.html_url}
              target="_blank"
            >
              {msg.html_url}
            </a>
          </p>
          <img
            src={msg.avatar_url}
            className="w-120 h-120 bg-gray-100 mx-auto rounded-90"
          />
          <p className="text-center">头像</p>
        </Card>
      ) : (
        <p className="w-500 h-500 text-24 mx-auto pt-250 text-center">
          No Data
        </p>
      )}
    </div>
  );
}
