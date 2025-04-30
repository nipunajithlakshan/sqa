import { useContext, useState } from "react";

import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routerset from "./routers/Routerset";
import { ConfigProvider } from "antd";


function App() {
  const [count, setCount] = useState(0);
  

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#844CCA", 
          colorPrimaryHover: "#542E83", 
          colorTextBase: "#000000", 
          borderRadius: 8, 
        },
      }}
    >
      <BrowserRouter>
        <Routerset />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
