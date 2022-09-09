
const toolRoute = [{
	path: 'grid',
	name: 'toolGrid',
	component: () => import('@/views/tool/page/grid.vue'),
	meta: {
		title: '工具'
	}
}, {
	path: 'time',
	name: 'toolTime',
	component: () => import('@/views/tool/page/time.vue'),
	meta: {
		title: '时间'
	}
}]

export default toolRoute