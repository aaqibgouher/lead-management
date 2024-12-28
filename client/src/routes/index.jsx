import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import LoginAuthComponent from "../components/auth/login";
import DashboardLayout from "../layouts/dashboard";
import DashboardComponent from "../components/dashboard";
import RegisterAuthComponent from "../components/auth/register";
import LeadComponent from "../components/dashboard/leads";
import PocComponent from "../components/dashboard/pocs";
import InteractionsComponent from "../components/dashboard/interactions";
import AddLeadComponent from "../components/dashboard/leads/add";
import EditLeadComponent from "../components/dashboard/leads/edit";
import ViewLeadComponent from "../components/dashboard/leads/view";
import ViewPocComponent from "../components/dashboard/pocs/view";
import AddPocComponent from "../components/dashboard/pocs/add";
import EditPocComponent from "../components/dashboard/pocs/edit";
import AddInteractionComponent from "../components/dashboard/interactions/add";
import EditInteractionComponent from "../components/dashboard/interactions/edit";
import ViewInteractionComponent from "../components/dashboard/interactions/view";
import AuthMiddleware from "../middleware/auth";
import OrdersComponent from "../components/dashboard/orders";
import AddOrderComponent from "../components/dashboard/orders/add";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<LoginAuthComponent />} />
          <Route path="register" element={<RegisterAuthComponent />} />
        </Route>

        {/* DASHBOARD */}
        <Route path="/" element={<AuthMiddleware />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardComponent />} />

            {/* leads */}
            <Route path="/leads">
              <Route index element={<LeadComponent />} />
              <Route path="add" element={<AddLeadComponent />} />
              <Route path="edit/:leadId" element={<EditLeadComponent />} />
              <Route path="view/:leadId" element={<ViewLeadComponent />} />
            </Route>

            {/* poc */}
            <Route path="/poc">
              <Route index element={<PocComponent />} />
              <Route path="add" element={<AddPocComponent />} />
              <Route path="edit/:pocId" element={<EditPocComponent />} />
              <Route path="view/:pocId" element={<ViewPocComponent />} />
            </Route>

            {/* interaction */}
            <Route path="/interactions">
              <Route index element={<InteractionsComponent />} />
              <Route path="add" element={<AddInteractionComponent />} />
              <Route
                path="edit/:interactionId"
                element={<EditInteractionComponent />}
              />
              <Route
                path="view/:interactionId"
                element={<ViewInteractionComponent />}
              />
            </Route>

            {/* Orders */}
            <Route path="/orders">
              <Route index element={<OrdersComponent />} />
              <Route path="add" element={<AddOrderComponent />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
