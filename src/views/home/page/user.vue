<template>
	<div class="userContainer">
		<van-cell-group>
			<van-cell :title="item.name" is-link :to="item.path" v-for="(item,index) in list" :key="index" />
		</van-cell-group>
	</div>
</template>
<script>
	export default {
		data() {
			return {
        active:1,
				list: [{
					name: 'Grid宫格',
					path: '/tool/grid'
				}, {
					name: 'form表单',
					path: '/tool/form'
				},{
					name: 'swipe轮播图',
					path: '/tool/swipe'
				},{
					name: 'echarts',
					path: '/tool/echarts'
				},{
					name: 'tab标签页',
					path: '/tool/tab'
				},{
					name: '奇瑞',
					path: '/qirui/index'
				}]
			}
		},
		methods: {},
		created() {}
	}
</script>
<style lang="scss">
	.userContainer {
		padding: 0.24rem;
		.van-cell-group {
			border-radius: 0.2rem;
			overflow: hidden;
		}
	}
</style>
