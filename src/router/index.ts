import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import homeRoute from '@/views/home/router/index'
import toolRoute from '@/views/tool/router/index'
Vue.use(VueRouter)

// 解决重复点击导航路由报错
const methodsArray = ['push', 'replace']
methodsArray.forEach((method) => {
	const methodGen = VueRouter.prototype[method]
	VueRouter.prototype[method] = function(location, onResolve, onReject) {
		if (onResolve || onReject) return methodGen.call(this, location, onResolve, onReject)
		return methodGen.call(this, location).catch((err) => { })
	}
})

const routes: Array<RouteConfig> = [
	{
		path: "/",
		redirect: "/home/index"
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/home/page/layout.vue'),
		children: homeRoute
	},
	{
		path: '/tool',
		name: 'tool',
		component: () => import('@/views/home/page/layout.vue'),
		children: toolRoute
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
