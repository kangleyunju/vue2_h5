<template>
	<div class="userContainer">
		<div v-for="(item,index) in list" :key="index" class="cont" @click="jump(item.path)">
			<span>{{item.name}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					name:'Grid宫格',
					path:'/tool/grid'
				},{
					name:'DatetimePicker时间',
					path:'/tool/time'
				}]
			}
		},
		methods: {

		},
		created() {

		}
	}
</script>
<style lang="scss">
	.userContainer {
		padding-top: 0.3rem;
		.cont{
			height: 0.8rem;
			background: #fff;
			margin: 0 0.2rem;
			border-radius: 0.4rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 0.3rem;
		}
	}
</style>
