<template>
	<div class="indexContainer">
		<van-swipe :autoplay="5000">
		  <van-swipe-item v-for="(image, index) in images" :key="index">
		    <img v-lazy="image" />
		  </van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			  images: [
				'https://m15.360buyimg.com/mobilecms/jfs/t1/154356/26/24167/67804/62b0bc88E31cc0613/5addf82c08a790b7.jpg',
				'https://m15.360buyimg.com/mobilecms/s1062x420_jfs/t1/155997/8/25275/158819/619cc945Ef6b2f763/5a77b01ee8fb753f.jpg',
			  ]
			}
		},
		methods: {

		},
		created() {
			console.log(11)
		}
	}
</script>
<style lang="scss">
	.indexContainer {
		.van-swipe{
			height: 2.9rem;
			img{
				width: 100%;
			}
		}
	}
</style>
