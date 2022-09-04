
const homeRoute = [{
	path: 'index',
	name: 'homeIndex',
	component: () => import('@/views/home/page/index.vue'),
	meta: {
		title: 'Ê×Ò³'
	}
}, {
	path: 'user',
	name: 'homeUser',
	component: () => import('@/views/home/page/user.vue'),
	meta: {
		title: 'ÎÒµÄ'
	}
}]

export default homeRoute