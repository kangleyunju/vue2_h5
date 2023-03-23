<template>
  <div class="home">
    <div class="overview-header">
      <p class="title"><img class="icon"/>销售总览</p>
    </div>
    <van-tabs type="card">
      <van-tab title="日"></van-tab>
      <van-tab title="周"></van-tab>
      <van-tab title="月"></van-tab>
      <van-tab title="季"></van-tab>
      <van-tab title="年"></van-tab>
      <van-tab title="自定义"></van-tab>
    </van-tabs>
    <div class="overview-main">
      <div class="loudouChart" ref="loudouChart"></div>
    </div>
    
    <div class="overview-header">
      <p class="title"><img class="icon"/>战区数据</p>
    </div>
    <div class="overview-main" >
      <van-tabs v-model="activeComponent" >
        <van-tab title="全部" name="1"></van-tab>
        <van-tab title="战区" name="2"></van-tab>
        <van-tab title="大区" name="3"></van-tab>
        <van-tab title="经销商" name="4"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        activeComponent:1
      }
    },
    mounted() {
      setTimeout(() => {
        this.initChart()
      }, 1020)
    },
    methods: {
      initChart() {
        var myChart = this.$echarts.init(this.$refs.loudouChart)
        var option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
          },
          legend: {
            data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
          },
          series: [{
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [{ value: 60, name: 'Visit' }, { value: 40, name: 'Inquiry' }, { value: 40, name: 'Order' }, { value: 80, name: 'Click' }, { value: 100, name: 'Show' }]
          }]
        };
        myChart.setOption(option);
        window.addEventListener('resize', myChart.resize);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .home {
    padding:12px;
    .overview-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 14px;
      .title{
        font-size: 16px;
        font-weight: 700;
        color: #2D2E36;
        white-space: nowrap;
        display: flex;
        align-items: center;
        .icon{
          width: 18px;
          height: 18px;
          margin-right: 8px;
        }
      }
    }
    .overview-main{
      background: #FFFFFF;
      box-shadow: 0px 2px 10px 0px rgba(214,214,214,0.5);
      padding: 0 10px;
      border-radius: 8px;
      .loudouChart{
        min-height:300px;
      }
    }
  }
</style>
