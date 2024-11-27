import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Dropdown, Switch } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SunFilled,
  MoonFilled
} from "@ant-design/icons";

function Header({ darkMode, setDarkMode }) {
  const [bellValue, setBellValue] = useState(false);
  const [language, setLanguage] = useState(1);

  const bellHandler = () => setBellValue(!bellValue);

  const items = [
    {
      key: '1',
      label: 'Profilim',
      icon: <ProfileOutlined />
    },
    {
      key: '2',
      label: 'Çıkış Yap',
      icon: <LogoutOutlined />,
      onClick: () => localStorage.removeItem('accessToken')
    }
  ];

  const languageItems = [
    {
      key: '1',
      label: 'Türkçe',
      onClick: () => setLanguage(1)
    },
    {
      key: '2',
      label: 'English',
      onClick: () => setLanguage(2)
    }
  ];

  return (
    <div className="h-16 p-4 w-full flex justify-between items-center flex-row">
      <h2 className="text-2xl text-gray-800 text-center">Karlılık</h2>
      <div className="flex gap-6 flex-row items-center">
        <div>
          <Icon
            icon={bellValue ? "iconoir:bell" : "lets-icons:bell-fill"}
            style={{ 
              fontSize: "20px", 
              cursor: "pointer", 
              color: !bellValue && darkMode ? 'white' : 'black' 
            }}
            onClick={bellHandler}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <img
            src={require("../assets/blank-pp.jpg")}
            style={{ width: "30px", borderRadius: 1000 }}
            alt="Profile"
          />
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              {localStorage.getItem("userName")} <DownOutlined />
            </a>
          </Dropdown>
          <Switch
            style={{backgroundColor: !darkMode ? '#4096ff' : 'black'}}
            unCheckedChildren={<SunFilled style={{color:'yellow'}}/>}
            checkedChildren={<MoonFilled />}
            checked={darkMode}
            onChange={setDarkMode}
          />
          <Dropdown menu={{ items: languageItems }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              {language === 1 ? 'Türkçe' : 'English'}
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Header;