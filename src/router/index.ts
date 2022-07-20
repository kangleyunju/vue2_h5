import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import indexRoute from '@/views/home/router/index'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: "/",
		redirect: "/home/index"
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('../views/home/page/layout.vue'),
		children: indexRoute
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
