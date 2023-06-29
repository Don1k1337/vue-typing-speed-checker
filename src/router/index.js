import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CheckerView from '../views/CheckerView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/checker',
        name: 'typing-checker',
        component: CheckerView
    },
    {   path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFoundView,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;