import React from "react";
import { Routes, Route } from "react-router-dom";

import { Footer, MenuAppBar, PrivateRoute } from "components";

import { CreateBoard, EditBoard, ListBoard } from "pages/Board";
import { ListDynamicFieldConfigs } from "pages/DynamicFieldConfig";
import { CreateLeadTimeConfig, EditLeadTimeConfig, ListLeadTimeConfigs } from "pages/LeadTimeConfig";
import { CreateHoliday, EditHoliday, ListHolidays } from "pages/Holiday";
import { ListIssuePeriods, CreateIssuePeriod, IssuePeriodDetail } from "pages/IssuePeriod";
import { EditUserConfig } from "pages/UserConfig";
import { ListIssue } from "pages/Issue";
import { ListEstimateIssue } from "pages/EstimateIssue";

import "./DashboardRouter.scss";

export default () => <>
    <MenuAppBar/>
    <main className="dashboard__container">
        <Routes>
            <Route path="/boards" element={<PrivateRoute component={ListBoard} />} />
            <Route path="/boards/new" element={<PrivateRoute component={CreateBoard} />} />
            <Route path="/boards/:boardId/edit" element={<PrivateRoute component={EditBoard} />} />

            <Route path="/boards/:boardId/dynamic-field-configs" element={<PrivateRoute component={ListDynamicFieldConfigs} />} />

            <Route path="/boards/:boardId/lead-time-configs" element={<PrivateRoute component={ListLeadTimeConfigs} />} />
            <Route path="/boards/:boardId/lead-time-configs/new" element={<PrivateRoute component={CreateLeadTimeConfig} />} />
            <Route path="/boards/:boardId/lead-time-configs/:leadTimeConfigId/edit" element={<PrivateRoute component={EditLeadTimeConfig} />} />

            <Route path="/boards/:boardId/holidays" element={<PrivateRoute component={ListHolidays} />} />
            <Route path="/boards/:boardId/holidays/new" element={<PrivateRoute component={CreateHoliday} />} />
            <Route path="/boards/:boardId/holidays/:holidayId/edit" element={<PrivateRoute component={EditHoliday} />} />

            <Route path="/boards/:boardId/issue-periods" element={<PrivateRoute component={ListIssuePeriods} />} />
            <Route path="/boards/:boardId/issue-periods/:issuePeriodId" element={<PrivateRoute component={IssuePeriodDetail} />} />
            <Route path="/boards/:boardId/issue-periods/new" element={<PrivateRoute component={CreateIssuePeriod} />} />

            <Route path="/users/me/configs" element={<PrivateRoute component={EditUserConfig} />} />

            <Route path="/boards/:boardId/issues" element={<PrivateRoute component={ListIssue} />} />

            <Route path="/boards/:boardId/estimates" element={<PrivateRoute component={ListEstimateIssue} />} />
        </Routes>
    </main>
    <Footer/>
</>;
