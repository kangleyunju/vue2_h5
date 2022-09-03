
const homeRoute = [{
	path: 'index',
	name: 'homeIndex',
	component: () => import('@/views/home/page/index.vue'),
	meta: {
		title: '首页'
	}
}, {
	path: 'user',
	name: 'homeUser',
	component: () => import('@/views/home/page/user.vue'),
	meta: {
		title: '我的'
	}
}]

export default homeRoute