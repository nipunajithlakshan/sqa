import { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import viteLogo from "/vite.svg";
import "./App.css";
import Routerset from "./routers/Routerset";
import { ConfigProvider } from "antd";
import PaymentSlipUpload from './pages/payments/PaymentSlipUpload';
import SemesterRegistration from './pages/registration/SemesterRegistration';
import Dashboard from './pages/dashboard/Dashboard';


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
      <Router>
        <Routes>
          <Route path="/" element={<Routerset />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="semester-registration" element={<SemesterRegistration />} />
          </Route>
          <Route path="/payment-upload" element={<PaymentSlipUpload />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App; 