<template>
	<div class="footerContainer">
		<van-tabbar v-model="active" active-color="#487FFC" inactive-color="#999999">
			<van-tabbar-item v-for="(item,index) in list" :key="index" :to="item.path" replace>
				<span>{{item.meta.title}}</span>
				<template #icon="props">
					<img :src="props.active ? item.meta.img2 : item.meta.img1" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
	import homeRoute from '@/views/home/router/index'
	export default {
		data() {
			return {
				active: 0,
				list: homeRoute
			}
		},
		methods: {},
		created() {
			this.active = this.list.findIndex(item => {
				return item.name == this.$route.name
			})
		}
	}
</script>
<style lang="scss">
	.footerContainer {}
</style>
