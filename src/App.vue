<template>
	<div id="app" :class="{'pc':!isMobile}">
		<router-view />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isMobile: false
			}
		},
		methods: {
			checkIsMobile(){
				setTimeout(()=>{
					this.isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)?true:false
				})
			}
		},
		created() {
			this.checkIsMobile()
			window.onresize = () => {
				this.checkIsMobile()
			}
		}
	}
</script>
<style lang="scss">
	.pc {
		width: 375px;
		position: fixed;
		height: 80vh;
		min-height: 600px;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border: rgba(0,0,0,.7) solid 8px;
		border-radius: 6px;
	}
	body {
		color: #333333;
		background-color: #f8f8f8;
		margin: 0;
		padding: 0;
		font-size: 0.24rem;
	}
	.van-swipe{
		img{
			pointer-events:none;
		}
	}
</style>
