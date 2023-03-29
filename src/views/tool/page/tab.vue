<template>
	<div class="tabContainer">
		<van-tabs v-model="avtive" sticky scrollspy  @change="changeTab" ref="tabs" background="#338bff" color="#fff" title-active-color="#fff" title-inactive-color="#fff" line-height="2px" line-width="24px" offset-top="0">
			<van-tab v-for="index in 8" :title="'选项 ' + index" :key="index" :name="index">
				<div class="item">内容 {{ index }}</div>
			</van-tab>
		</van-tabs>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				avtive: 1
			}
		},
		methods: {
			changeTab(e) {
				console.log(e)
			}
		}
	}
</script>
<style lang="scss">
	.tabContainer {
		height: 100vh;
		.van-tabs {
			.item {
				height: 400px;
				padding: 10px;
				box-sizing: border-box;
				border: 1px solid red;
			}
		}
	}
</style>