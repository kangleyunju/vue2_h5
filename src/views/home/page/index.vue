<template>
	<div class="indexContainer">
		<div class="main">
			<h2>主要内容</h2>
			<div>vantui的使用</div>
			<div>rem布局，适配pc端，完美展示</div>
			<div>vue2.7兼容部分vue3语法，启动更快</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		methods: {},
		created() {}
	}
</script>
<style lang="scss">
	.indexContainer {
		padding: 0.8rem 0.24rem 0.24rem;
		.main{
			background-color: #c1ada0;
			padding: 0.2rem 0.24rem 0.2rem;
			text-align: center;
			border-radius: 0.2rem;
			h2{
				margin-bottom: 0.1rem;
			}
			div{
				font-size: 0.32rem;
				line-height: 0.5rem;
			}
		}
	}
</style>
