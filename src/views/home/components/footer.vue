<template>
	<div class="footerContainer">
		<div v-for="(item,index) in list" :key="index" :class="{active:$route.path==item.path}" @click="$router.push(item.path)">
			<img :src="$route.path==item.path?item.img2:item.img1"/>
			<span>{{item.name}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list:[{
					name:'首页',
					path:'/home/index',
					img1:require('@/assets/home/tab_home1.png'),
					img2:require('@/assets/home/tab_home2.png'),
				},{
					name:'我的',
					path:'/home/user',
					img1:require('@/assets/home/tab_my1.png'),
					img2:require('@/assets/home/tab_my2.png')
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
	.footerContainer {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		background-color: #fff;
		position: fixed;
		bottom:0;
		height: 1.2rem;
		width: 100%;
		div{
			width: 100%;
			text-align: center;
			color: #999;
			&.active{
				color: #487FFC;
			}
			span{
				display: block;
			}
			img{
				height: 0.5rem;
				width: 0.5rem;
			}
		}
	}
</style>
