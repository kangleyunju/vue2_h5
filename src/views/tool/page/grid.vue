<template>
	<div class="gridContainer">
		<van-grid :column-num="3">
		  <van-grid-item v-for="value in 15" :key="value" icon="photo-o" :text="'文字'+value"/>
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

		}
	}
</script>
<style lang="scss">
	.gridContainer {
    .van-grid{
      margin: 0.24rem;
      overflow: hidden;
      border-radius: 0.12rem;
    }
	}
</style>
