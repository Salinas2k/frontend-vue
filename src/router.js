import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Index";
import Login from "./views/Login";
import Register from "./views/Register";

import Dashboard from "@/pages/Dashboard";
import UserProfile from "@/pages/UserProfile";
import Notifications from "@/pages/Notifications";
import Icons from "@/pages/Icons";
import Maps from "@/pages/Maps";
import Typography from "@/pages/Typography";
import TableList from "@/pages/TableList";

import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";

Vue.use(Router);

const routes = [
    {
        path: "/",
        component: DashboardLayout,
        redirect: "/dashboard",
        children: [
          {
            path: "dashboard",
            name: "dashboard",
            component: Dashboard
          },
          {
            path: "/",
            name: "home",
            component: Home
          },
          {
            path: "/login", 
            component: Login
          },
          {
            path: "/register",
            component: Register
          },
          {
            path: "stats",
            name: "stats",
            component: UserProfile
          },
          {
            path: "notifications",
            name: "notifications",
            component: Notifications
          },
          {
            path: "icons",
            name: "icons",
            component: Icons
          },
          {
            path: "maps",
            name: "maps",
            component: Maps
          },
          {
            path: "typography",
            name: "typography",
            component: Typography
          },
          {
            path: "table-list",
            name: "table-list",
            component: TableList
          }
        ]
      },
      { path: "*", component: NotFound }
]

export default new Router({
    routes,
    linkActiveClass: "active"
})