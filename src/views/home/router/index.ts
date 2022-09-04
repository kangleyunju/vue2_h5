
const homeRoute = [{
	path: 'index',
	name: 'homeIndex',
	component: () => import('@/views/home/page/index.vue'),
	meta: {
		title: '��ҳ'
	}
}, {
	path: 'user',
	name: 'homeUser',
	component: () => import('@/views/home/page/user.vue'),
	meta: {
		title: '�ҵ�'
	}
}]

export default homeRoute