<template>
	<div class="swipeContainer">
		<h3>基础用法</h3>
		<van-swipe :autoplay="5000">
			<van-swipe-item v-for="(item, index) in images" :key="index">
				<img v-lazy="item" />
			</van-swipe-item>
		</van-swipe>
		<h3>自定义指示器</h3>
		<van-swipe :autoplay="5000" @change="onChange">
			<van-swipe-item v-for="(item, index) in images" :key="index">
				<img v-lazy="item" />
			</van-swipe-item>
			<template #indicator>
				<div class="indicator">{{ current + 1 }}/3</div>
			</template>
		</van-swipe>
	</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				current: 0,
				images: [
					require('@/assets/home/1.jpg'),
					require('@/assets/home/2.jpg'),
					require('@/assets/home/3.jpg')
				]
			}
		},
		methods: {
			onChange(index) {
				this.current = index;
			}
		},
		created() {}
	}
</script>
<style lang="scss">
	.swipeContainer {
    padding: 0 0.24rem 0.24rem;
    margin:0.24rem;
    border-radius: 0.12rem;
    background-color: #fff;
		h3 {
			line-height: 0.6rem;
		}
		.van-swipe {
			height: 2.9rem;
			.van-swipe-item {
				img {
					height: 100%;
					width: 100%;
				}
			}
			.indicator {
				position: absolute;
				right: 5px;
				bottom: 5px;
				padding: 2px 10px;
				font-size: 12px;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 10px;
				color: #fff;
			}
		}
	}
</style>
