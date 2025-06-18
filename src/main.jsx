import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { HashRouter, Routes, Route } from "react-router";
import "antd/dist/reset.css";
import "@ant-design/v5-patch-for-react-19";
import "./mock/mock";
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/Home";
import RechargeForm from "./pages/RechargeForm";
import ListPage from "./pages/ListPage";
import List from "./components/List";
import IdInfo from "./components/IdInfo";
import Mid from "./components/Mid";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path="form" element={<RechargeForm />}></Route>
          <Route path="list" element={<Mid />}>
            <Route index element={<List />}></Route>
            <Route path=":id" element={<IdInfo />}></Route>
          </Route>
          <Route path="listmore" element={<ListPage />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
