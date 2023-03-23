<template>
  <div class="trendTab">
   <div class="trendChart" ref="trendChart"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        var myChart = this.$echarts.init(this.$refs.trendChart)
        var option= {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['今日', '环比', '同比'],
            bottom: '0',
            show: true
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
            data: ['2022/10/09', '2022/10/09', '2022/10/09']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '今日',
              type: 'line',
              stack: 'Total',
              data: [1, 5, 10],
              lineStyle:{
                color:'#00B42A'
              }
            },
            {
              name: '环比',
              type: 'line',
              stack: 'Total',
              data: [10, 3, 2],
              lineStyle:{
                color:'#F7BA1E'
              }
            },
            {
              name: '同比',
              type: 'line',
              stack: 'Total',
              data: [4, 9,2 ],
              lineStyle:{
                color:'#F77234'
              }
            }
          ]
        }
        option && myChart.setOption(option);
      }
    }
  }
</script>
<style lang="scss">
  .trendTab {
    .trendChart{
      height:300px;
    }
  }
</style>
