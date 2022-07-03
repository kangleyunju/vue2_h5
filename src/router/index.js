import Vue from 'vue'
import VueRouter from 'vue-router'
import {indexRoute} from '@/views/home/router/index'

Vue.use(VueRouter)

const routes = [{
		path: "/",
		redirect: "/home/index"
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/home/page/layout'),
		children: indexRoute
	}
]

export default new VueRouter({
	routes
})
