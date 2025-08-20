import React from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DashboardRouter, ScrollToTop } from "routers";

import Login from "pages/Login/Login";

export default () =>
    <BrowserRouter>
        <ScrollToTop>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<DashboardRouter />} />
            </Routes>
        </ScrollToTop>
    </BrowserRouter>;

