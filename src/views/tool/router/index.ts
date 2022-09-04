
const toolRoute = [{
	path: 'grid',
	name: 'toolGrid',
	component: () => import('@/views/tool/page/grid.vue'),
	meta: {
		title: '��ҳ'
	}
}, {
	path: 'time',
	name: 'toolTime',
	component: () => import('@/views/tool/page/time.vue'),
	meta: {
		title: '�ҵ�'
	}
}]

export default toolRoute