<template>
	<div class="trendTab">
		<div class="trendChart" ref="trendChart"></div>
	</div>
</template>
<script>
	import { getTrend } from "../api"
	export default {
		data() {
			return {}
		},
		mounted() {
			this.getTrend()
		},
		methods: {
			getTrend() {
				this.initChart()
			},
			initChart() {
				var myChart = this.$echarts.init(this.$refs.trendChart)
				var option = {
					tooltip: {
						trigger: 'axis',
						show: false
					},
					legend: {
						data: ['今日', '环比', '同比'],
						bottom: 0,
						show: true,
						icon: 'circle',
						itemWidth: 10,
						itemGap: 30,
						textStyle: {
							fontSize: 12,
						}
					},
					grid: {
						left: '4%',
						right: '4%',
						top: '10%',
						bottom: '10%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						axisLine: {
							show: true,
							lineStyle: {
								color: "#EBEBEB"
							}
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: "#39373D",
							}
						},
						data: ['2022/10/09', '2022/10/09', '2022/10/09']
					},
					yAxis: {
						type: 'value',
						axisLabel: {
							textStyle: {
								color: "#86909C"
							}
						}
					},
					series: [{
						name: '今日',
						type: 'line',
						data: [1, 5, 19],
						symbol: 'circle', //实心点
						symbolSize: 6, //点大小
						lineStyle: {
							color: '#00B42A'
						},
						itemStyle: {
							color: '#00B42A',
							borderColor: '#fff'
						}
					}, {
						name: '环比',
						type: 'line',
						data: [10, 3, 2],
						symbol: 'circle',
						symbolSize: 6,
						lineStyle: {
							color: '#F7BA1E'
						},
						itemStyle: {
							color: '#F7BA1E',
							borderColor: '#fff'
						}
					}, {
						name: '同比',
						type: 'line',
						data: [4, 9, 14],
						symbol: 'circle',
						symbolSize: 6,
						lineStyle: {
							color: '#F77234'
						},
						itemStyle: {
							color: '#F77234',
							borderColor: '#fff'
						}
					}]
				}
				option && myChart.setOption(option);
				window.addEventListener('resize', myChart.resize)
			}
		}
	}
</script>
<style lang="scss">
	.trendTab {
		.trendChart {
			height: 300px;
		}
	}
</style>