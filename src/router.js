import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Index";
import Login from "./views/Login";
import Register from "./views/Register";

Vue.use(Router);

const routes = [
    {
        path: "/", 
        component: Home
    },
    {
        path: "/login", 
        component: Login
    },
    {
        path: "/register",
        component: Register
    }
]

export default new Router({
    routes
})