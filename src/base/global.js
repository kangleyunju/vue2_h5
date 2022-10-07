export default {
	methods: {
		//路由跳转
		jump(path) {
			this.$router.push(path)
		},
		//转化时间
		parseTime(time,type=1) {
			if(type==1){
				let year =time.getFullYear()
				let month =time.getMonth()<10?"0"+time.getMonth():time.getMonth()
				let day =time.getDate()<10?"0"+time.getDate():time.getDate()
				let hour =time.getHours()<10?"0"+time.getHours():time.getHours()
				let minute =time.getMinutes()<10?"0"+time.getMinutes():time.getMinutes()
				let second =time.getSeconds()<10?"0"+time.getSeconds():time.getSeconds()
				return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second
			}
		}
	}
}
