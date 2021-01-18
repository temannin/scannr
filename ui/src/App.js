import React, { useState } from "react";
import "./App.css";

import { Layout, Menu, Typography } from "antd";
import { SettingOutlined, ScanOutlined } from "@ant-design/icons";

const { Title } = Typography;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Layout>
      <Menu
        onClick={handleClick}
        style={{ width: 256, minHeight: "100vh", position: "fixed" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Menu.Item
          style={{ marginTop: "50px" }}
          key="sub1"
          icon={<ScanOutlined />}
        >
          Scan
        </Menu.Item>
        <Menu.Item
          style={{ marginTop: "-8px" }}
          key="sub2"
          icon={<SettingOutlined />}
        >
          Configurations
        </Menu.Item>
      </Menu>
      Test
    </Layout>
  );
}

export default App;
