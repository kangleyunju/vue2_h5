<template>
	<div class="userContainer">
		<van-grid :column-num="3">
		  <van-grid-item v-for="value in 15" :key="value" icon="photo-o" text="文字"/>
		</van-grid>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		},
		created() {
			console.log(111111111);
		}
	}
</script>
<style lang="scss">
	.userContainer {

	}
</style>
