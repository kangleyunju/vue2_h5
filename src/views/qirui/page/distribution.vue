<template>
	<div class="distributionTab dataContainer">
		<div class="distribution" ref="distribution"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		mounted() {
			this.getDistribution()
		},
		methods: {
			getDistribution() {
				this.initChart()
			},
			initChart() {
				var myChart = this.$echarts.init(this.$refs.distribution)
				var option = {
					tooltip: {
						trigger: 'axis',
						show: false,
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						show: false
					},
					grid: {
						top: '3%',
						left: '3%',
						right: '3%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						boundaryGap: [0, 0]
					},
					yAxis: {
						type: 'category',
						data: ['上海', '北京', '成都', '深圳', '厦门', '重庆']
					},
					series: [{
						name: '分布',
						type: 'bar',
						data: [45, 35, 29, 10, 13, 18],
						itemStyle: {
							color: '#009FB1'
						}
					}]
				};
				option && myChart.setOption(option);
				window.addEventListener('resize', myChart.resize)
			}
		}
	}
</script>
<style lang="scss">
	.distributionTab {
		.distribution {
			height: 400px;
		}
	}
</style>