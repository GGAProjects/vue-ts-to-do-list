import { createRouter, createWebHistory } from "vue-router"


const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import("@/pages/Home/Home.vue"),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import("@/pages/Login/Login.vue"),
	},
	{
		path: '/register',
		name: 'register',
		component: () => import("@/pages/Register/Register.vue"),
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem("token");
	const requiredAuth = to.matched.some(record => record.meta.requiresAuth);

	if (token && requiredAuth) next();
	else if (!token && requiredAuth) next({ name: 'login' })
	else if (token && !requiredAuth) next({ name: 'home' })
	else next();
});