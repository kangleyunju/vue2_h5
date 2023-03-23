<template>
  <div class="saleViewContainer">
    <div class="dataContainer">
      <div class="title">
        <div class="left">销售总览
          <van-icon name="question-o" />
        </div>
        <div class="right">更新时间: 2023-03-15</div>
      </div>
      <div class="viewBox">
        <div class="loudouChart" ref="loudouChart"></div>
        <div class="rightData">
          <div class="item">
            <div>跟进率 50%</div>
          </div>
          <div class="item">
            <p>有效线索率 15%</p>
            <div>30min跟进率 35%</div>
          </div>
          <div class="item">
            <p>有效到店率 35%</p>
            <div>到店率 15%</div>
          </div>
          <div class="item">
            <p>有效试驾率 15%</p>
            <div>试驾率 15%</div>
          </div>
          <div class="item">
            <p>有效下订率 15%</p>
            <div>下订率 15%</div>
          </div>
          <div class="item last">
            <p>有效线索成交率 15%</p>
            <div>成交率 15%</div>
          </div>
        </div>
        <div class="subTitle">
          <div>销售阶段</div>
          <div>阶段转化率</div>
        </div>
        <div class="fieldBox">
          <div v-for="(item,index) in fieldList" :key="index" :class="{active:activeField.includes(item.value)}" @click="changeField(item.value)"><span></span>{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeField: [1, 2, 3],
        fieldList: [{
          name: '净率',
          value: 1
        }, {
          name: '环比',
          value: 2
        }, {
          name: '同比',
          value: 3
        }],
        activeTab: 1
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      changeTime(val){
        
      },
      changeField(val) {
        const index = this.activeField.indexOf(val)
        index < 0 ? this.activeField.push(val) : this.activeField.splice(index, 1)
      },
      changeTab(e) {},
      initChart() {
        if (this.$refs.loudouChart) {
          var myChart = this.$echarts.init(this.$refs.loudouChart)
          var option = {
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c}'
            },
            color: ["#BEF5FB", "#4ED9E9", "#4ACDDC", "#00B9CE", "#00A4B6", "#008F9F"],
            series: [{
              name: 'Funnel',
              type: 'funnel',
              top: 0,
              left: 0,
              bottom: 0,
              width: '100%',
              minSize: "50%",
              maxSize: "100%",
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
                borderWidth: 0.5,
                normal: {
                  label: {
                    show: true,
                    formatter: "{b}({c}):\n 同比{c.x} 环比{c.z}",
                    position: "inner",
                    fontSize: 10,
                    color: '#4E5969'
                  }
                }
              },
              emphasis: {
                label: {
                  // fontSize: 14
                }
              },
              data: [{ value: { x: 1, y: 2, z: 3 }, name: '线索量' }, { value: 79, name: '客户量' }, { value: 69, name: '到店量' }, { value: 40, name: '试驾量' }, { value: 35, name: '下订量' }, { value: 34, name: '成交量' }]
            }]
          }
          myChart.setOption(option);
          window.addEventListener('resize', myChart.resize)
        }
      }
    }
  }
</script>
<style lang="scss">
  .dataContainer {
    .viewBox {
      position: relative;
      .loudouChart {
        height: 186px;
        width: 254px;
      }
      .rightData {
        position: absolute;
        right: 0;
        width: 100%;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .item {
          height: 31px;
          text-align: right;
          width: 140px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          &:not(last):before {
            content: '';
            position: absolute;
            right: 30px;
            bottom: 0;
            width: 180px;
            border-bottom: 1px dashed #E6E6E6;
          }
          p {
            color: #a9aaba;
            text-align: center;
            transform: scale(0.7);
            transform-origin: right;
            line-height: 6px;
          }
          div {
            color: #009FB1;
            text-align: center;
            transform: scale(0.7);
            transform-origin: right;
          }
        }
      }
      .subTitle {
        display: flex;
        align-items: center;
        height: 40px;
        div {
          transform: scale(0.7);
          color: #86909C;
          &:first-child {
            width: 254px;
            text-align: center;
          }
          &:last-child {
            flex: 1;
            transform-origin: left;
          }
        }
      }
      .fieldBox {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding-bottom: 15px;
        width: 80%;
        margin: 0 auto;
        div {
          font-size: 12px;
          color: #C9CDD4;
          display: flex;
          align-items: center;
          span {
            width: 8px;
            height: 8px;
            background: #E5E6EB;
            border-radius: 50%;
            display: block;
            margin-right: 8px;
          }
          &.active {
            color: #2D2E37;
            span {
              background: #009FB1;
            }
          }
        }
      }
    }
    .stickyTab {
      .van-tabs__wrap {
        height: 40px;
      }
      .van-tabs__nav--line {
        margin-bottom: 0;
      }
      .van-sticky--fixed {
        margin: 0 10px;
        padding: 0 12px;
      }
    }
  }
</style>
