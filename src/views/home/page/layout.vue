<template>
	<div class="latoutContainer">
		<router-view />
		<Footer v-if="$route.meta.footer" />
	</div>
</template>
<script>
	import Footer from "../components/footer"
	export default ({
		components: {
			Footer
		}
	})
</script>
<style lang="scss">
	.latoutContainer {
		overflow: auto;
		height: 100%;
	}
</style>
