import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/stores/authStore";

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import("@/pages/Home/Home.vue"),
		meta: {
			requiresAuth: true,
		}
	},
	{
		path: '/grupos',
		name: 'group',
		component: () => import("@/pages/TaskGroup/TaskGroup.vue"),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import("@/pages/Login/Login.vue"),
		meta: {
			layout: "Auth"
		}
	},
	{
		path: '/register',
		name: 'register',
		component: () => import("@/pages/Register/Register.vue"),
		meta: {
			layout: "Auth"
		}
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const requiredAuth = to.matched.some(record => record.meta.requiresAuth);
	const authStore = useAuthStore();

	if (authStore.token && requiredAuth) next();
	else if (!authStore.token && requiredAuth) next({ name: 'login' })
	else if (authStore.token && !requiredAuth) next({ name: 'home' })
	else next();
});