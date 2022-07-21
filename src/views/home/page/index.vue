<template>
	<div class="indexContainer">
		<van-swipe :autoplay="5000">
		  <van-swipe-item v-for="(item, index) in images" :key="index">
			  <img v-lazy="item" />
		  </van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			  images: [
				require('@/assets/home/1.jpg'),
				require('@/assets/home/2.jpg'),
				require('@/assets/home/3.jpg')
			  ]
			}
		},
		methods: {
			
		},
		created() {

		}
	}
</script>
<style lang="scss">
	.indexContainer {
		.van-swipe{
			height: 2.9rem;
			.van-swipe-item{
				img{
					height: 100%;
					width: 100%;
				}
			}
		}
	}
</style>
