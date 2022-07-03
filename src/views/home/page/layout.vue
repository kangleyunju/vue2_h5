<template>
	<div class="homeContainer">
		<keep-alive>
			<router-view/>
		</keep-alive>
		<Footer/>
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
