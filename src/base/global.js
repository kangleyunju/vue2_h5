export default {
	methods: {
		jump(path) {
			console.log(path)
			this.$router.push(path)
		}
	}
}
