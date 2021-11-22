import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        {
            name: 'Home',
            path: '/',
            component: () => import('@/views/Home'),
            children: [
                {
                    name: 'Login',
                    path: 'login/',
                    component: () => import('@/views/Login')
                },
                {
                    name: 'Register',
                    path: 'register/',
                    component: () => import('@/views/Register')
                },
            ],
        },
    ],
})