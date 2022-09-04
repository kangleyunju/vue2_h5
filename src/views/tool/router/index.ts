
const toolRoute = [{
	path: 'grid',
	name: 'toolGrid',
	component: () => import('@/views/tool/page/grid.vue'),
	meta: {
		title: 'Ê×Ò³'
	}
}, {
	path: 'time',
	name: 'toolTime',
	component: () => import('@/views/tool/page/time.vue'),
	meta: {
		title: 'ÎÒµÄ'
	}
}]

export default toolRoute