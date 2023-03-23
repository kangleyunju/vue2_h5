
const toolRoute = [{
	path: 'grid',
	name: 'toolGrid',
	component: () => import('@/views/tool/page/grid.vue'),
	meta: {
		title: '工具'
	}
}, {
	path: 'form',
	name: 'toolForm',
	component: () => import('@/views/tool/page/form.vue'),
	meta: {
		title: '表单'
	}
},{
	path: 'swipe',
	name: 'toolSwiper',
	component: () => import('@/views/tool/page/swipe.vue'),
	meta: {
		title: '轮播图'
	}
},{
	path: 'echarts',
	name: 'toolEcharts',
	component: () => import('@/views/tool/page/echarts.vue'),
	meta: {
		title: 'echarts'
	}
},{
	path: 'tab',
	name: 'toolTab',
	component: () => import('@/views/tool/page/tab.vue'),
	meta: {
		title: 'table'
	}
}]

export default toolRoute