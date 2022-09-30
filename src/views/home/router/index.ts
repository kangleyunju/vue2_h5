
const homeRoute = [{
	path: 'index',
	name: 'homeIndex',
	component: () => import('@/views/home/page/index.vue'),
	meta: {
		title: '首页',
		footer: true,
		img1: require('@/assets/home/tab_home1.png'),
		img2: require('@/assets/home/tab_home2.png')
	}
}, {
	path: 'user',
	name: 'homeUser',
	component: () => import('@/views/home/page/user.vue'),
	meta: {
		title: '工具',
		footer: true,
		img1: require('@/assets/home/tab_my1.png'),
		img2: require('@/assets/home/tab_my2.png')
	}
}]

export default homeRoute