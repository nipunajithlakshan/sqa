import React from "react";
import { Route, Router, Routes, Navigate } from "react-router-dom";

import AboutUs from "../pages/section2/AboutUs";
import Home from "../pages/section1/Home";

import Navbar from "../component/Navbar";
import ScrollToTop from "../component/scrolling/ScrollToTop";
import LandingPage from "../pages/landigPage/LandingPage";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashbord/Dashboard";
import MainLayout from "../layout/MainLayout";
import Registration from "../pages/registration/Registration";
import GroupRegistration from "../pages/projects/GroupRegistration";
import DashboardLayout from "../pages/dashbord/DashboardLayout";
import SemesterRegistration from "../pages/registration/SemesterRegistration";
import PaymentSlipUpload from '../pages/payments/PaymentSlipUpload';

import Assignment from "../pages/projects/Assignment";

const Routerset = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <LandingPage />
          </>
        }
      />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      {/* Dashboard with persistent layout */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="registration" element={<GroupRegistration />} />
        <Route path="semester-registration" element={<SemesterRegistration />} />
        <Route path="assignment" element={<Assignment />} />
      </Route>
      <Route path="/payment-upload" element={<PaymentSlipUpload />} />
      <Route path="*" element={<Navigate to="/dashboard/semester-registration" replace />} />
    </Routes>
  );
};

export default Routerset;
