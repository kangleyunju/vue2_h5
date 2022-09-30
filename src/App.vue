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
			checkIsMobile() {
				setTimeout(() => {
					this.isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? true : false
					document.querySelector("body").style.background=this.isMobile?"#f8f8f8":`url(${require('@/assets/home/bg.jpg')})`
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
		border: rgba(0, 0, 0, .7) solid 8px;
		border-radius: 6px;
		overflow-y: hidden;
		background: #f8f8f8;
	}
	body {
		color: #333333;
		margin: 0;
		padding: 0;
		font-size: 0.24rem;
		//禁止复制
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		-khtml-user-select: none;
		user-select: none;
	}
	::-webkit-scrollbar {
		display: none;
	}
	.van-swipe {
		img {
			pointer-events: none;
		}
	}
</style>
