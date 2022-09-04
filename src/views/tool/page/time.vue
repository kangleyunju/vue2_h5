<template>
	<div class="userContainer">
		<van-datetime-picker
		  v-model="currentDate"
		  type="datetime"
		  title="选择年月日"
		  :min-date="minDate"
		  :max-date="maxDate"
		  :filter="filter"
		/>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			  minDate: new Date(2020, 0, 1),
			  maxDate: new Date(2025, 11, 31),
			  currentDate: new Date()
			}
		},
		methods: {
			// 过滤间隔
			filter(type, options) {
				if (type === 'minute') 
				return options.filter((option) => option % 15 == 0)
				return options;
			}
		},
		created() {
			let now=new Date()
			let minute=new Date().getMinutes()
			console.log(minute)
			if([0,15,30,45].includes(minute)){
				this.currentDate=new Date()
			}else if(minute>45){
				this.currentDate=new Date((60-minute)*60*1000+now.getTime())
			}else if(minute>30){
				this.currentDate=new Date((45-minute)*60*1000+now.getTime())
			}else if(minute>15){
				this.currentDate=new Date((30-minute)*60*1000+now.getTime())
			}else{
				this.currentDate=new Date((15-minute)*60*1000+now.getTime())
			}
			console.log(this.currentDate)
		}
	}
</script>
<style lang="scss">
	.userContainer {

	}
</style>
