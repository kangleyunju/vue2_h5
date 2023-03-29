<template>
	<div class="distributionTab">
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
						show: true,
						axisPointer: {
							type: 'shadow'
						},
            extraCssText: 'z-index:2'
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
            inverse: true, 
            max: 9, 
						data: ['上海', '北京', '成都', '深圳', '厦门', '重庆','福州','温州','郑州','沈阳']
					},
					series: [{
						name: '分布',
						type: 'bar',
            barWidth: 18,//高度
            realtimeSort: true, // 对数据进行排序
						data: [45, 35, 29, 10, 13, 18,13, 18,13,9],
            label: {
            	show: true,
            	position: 'inside',
              formatter: function(param) {
               return param.value
              }
            },
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
			height: 300px;
		}
	}
</style>