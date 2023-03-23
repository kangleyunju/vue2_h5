<template>
  <div class="">
    <div class="title">
      <div class="left">{{dataType==1?'战区数据':dataType==2?'渠道数据':'车型数据'}}
        <van-icon name="question-o" @click="tipShow=true" />
      </div>
      <div class="right">
        <div v-for="(item,index) in btnList" :key="index" :class="{active:activeType.includes(item.value)}" @click="changeType(item.value)">
          <van-icon name="passed" />{{item.name}}
        </div>
      </div>
    </div>
    <van-tabs v-if="1=='todo'" v-model="activeTab" color="#009FB1" title-active-color="#009FB1" line-height="2px" title-inactive-color="#86909C" @change="changeTab">
      <van-tab :title="item.title" :name="item.name" v-for="(item,index) in tabList" :key="index"></van-tab>
    </van-tabs>
    <dataTable :tableHeader="tableHeader" :tableData="tableData" @changeSort="changeSort">
      <div slot="zhanqu" slot-scope="scope" class="tableItem firstItem">
        <div><img src="@/assets/home/arrow-down.png" :class="{fold:scope.row.isFold}" @click="scope.row.isFold=!scope.row.isFold">{{scope.row.zhanqu}}
          <van-icon name="arrow" />
        </div>
        <div v-if="activeType.includes(1)&&!scope.row.isFold">占比</div>
        <div v-if="activeType.includes(2)&&!scope.row.isFold">环比</div>
        <div v-if="activeType.includes(3)&&!scope.row.isFold">同比{{!scope.row.isFold}}</div>
      </div>
      <div :slot="item.prop" slot-scope="scope" class="tableItem" v-for="(item,index) in propList" :key="index">
        <div>{{scope.row[item.prop]}}</div>
        <div v-if="activeType.includes(1)&&!scope.row.isFold" :class="{red:scope.row[item.prop]>0,green:scope.row[item.prop]<0}"><span v-if="scope.row[item.prop]>0">+</span>{{scope.row[item.prop]}}%</div>
        <div v-if="activeType.includes(2)&&!scope.row.isFold" :class="{red:scope.row[item.prop]>0,green:scope.row[item.prop]<0}"><span v-if="scope.row[item.prop]>0">+</span>{{scope.row[item.prop]}}%</div>
        <div v-if="activeType.includes(3)&&!scope.row.isFold" :class="{red:scope.row[item.prop]>0,green:scope.row[item.prop]<0}"><span v-if="scope.row[item.prop]>0">+</span>{{scope.row[item.prop]}}%</div>
      </div>
    </dataTable>
    <van-popup v-model="tipShow">
      <div class="popup_title">提示</div>
      <div class="popup_content">
        <div v-for="(item,index) in zhanquTip" :key="index">{{index}}.{{item}}</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import dataTable from '@/components/dataTable'
  import { zhanquTip } from './tip.js'
  export default {
    props: {
      dataType: {
        type: Number,
        default: 1
      }
    },
    components: {
      dataTable
    },
    data() {
      return {
        zhanquTip: zhanquTip,
        tipShow: false,
        activeTab: 1,
        activeType: [1, 2, 3],
        btnList: [{
          name: '占比',
          value: 1
        }, {
          name: '环比',
          value: 2
        }, {
          name: '同比',
          value: 3
        }],
        tabList: [],
        tableData: [{
          zhanqu: '东部战区',
          chengjiao: 12,
          xiading: 3,
          shijia: 10,
          daodian: 13,
          kehu: 33,
          xiansuo: 130,
          isFold: false
        }, {
          zhanqu: '西部战区',
          chengjiao: 777,
          xiading: 3,
          shijia: 10,
          daodian: -13,
          kehu: 33,
          xiansuo: 130,
          isFold: false
        }, {
          zhanqu: '北部战区',
          chengjiao: 888,
          xiading: 3,
          shijia: 10,
          daodian: 13,
          kehu: 33,
          xiansuo: 130,
          isFold: false
        }, {
          zhanqu: '南部战区',
          chengjiao: 999,
          xiading: 3,
          shijia: 0,
          daodian: 13,
          kehu: -33,
          xiansuo: 130,
          isFold: false
        }],
        tableHeader: [{
          label: '战区/大区',
          prop: 'zhanqu',
          width: '110px',
          fixed:'left'
        }, {
          label: '成交量',
          prop: 'chengjiao',
          sort: 1,
          width: '80px'
        }, {
          label: '下订量',
          prop: 'xiading',
          sort: 1,
          width: '80px'
        }, {
          label: '试驾量',
          prop: 'shijia',
          sort: 1,
          width: '80px'
        }, {
          label: '到店量',
          prop: 'daodian',
          sort: 1,
          width: '80px'
        }, {
          label: '客户量',
          prop: 'kehu',
          sort: 1,
          width: '80px'
        }, {
          label: '线索量',
          prop: 'xiansuo',
          sort: 1,
          width: '80px'
        }],
        propList: [{
          prop: 'chengjiao'
        }, {
          prop: 'xiading'
        }, {
          prop: 'shijia'
        }, {
          prop: 'daodian'
        }, {
          prop: 'kehu'
        }, {
          prop: 'xiansuo'
        }]
      }
    },
    mounted() {
      this.getTabList()
      console.log(this.zhanquTip)
    },
    methods: {
      changeType(val) {
        const index = this.activeType.indexOf(val)
        index < 0 ? this.activeType.push(val) : this.activeType.splice(index, 1)
      },
      changeSort(e) {
        this.tableHeader.forEach((item) => {
          if (item.prop == e.prop) {
            item.sort = e.sort == 1 ? 2 : e.sort == 2 ? 3 : 2
          } else if (item.sort) {
            item.sort = 1
          }
        })
      },
      getTabList() {
        if (this.dataType == 1) {
          this.tabList = [{
            title: '全部',
            name: 1
          }, {
            title: '战区',
            name: 2
          }, {
            title: '大区',
            name: 3
          }, {
            title: '经销商',
            name: 4
          }]
        } else if (this.dataType == 2) {
          this.tabList = [{
            title: '全部',
            name: 1
          }, {
            title: '线上',
            name: 2
          }, {
            title: '线下',
            name: 3
          }]
        } else {
          this.tabList = [{
            title: '全部',
            name: 1
          }, {
            title: 'QQ冰淇淋',
            name: 2
          }, {
            title: 'eQ2',
            name: 3
          }, {
            title: '艾瑞泽系列',
            name: 4
          }]
        }
      },
      changeTab() {}
    }
  }
</script>
<style lang="scss">
  .dataContainer {
    .title {
      .right {
        display: flex;
        align-items: center;
        div {
          width: 53px;
          height: 20px;
          border-radius: 10px;
          font-size: 12px;
          color: #96969B;
          background: #F2F3F5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 12px;
          .van-icon {
            margin-right: 4px;
            transform: scale(0.8);
            margin-top: 2px;
          }
          &.active {
            color: #009FB1;
            background: rgba(0, 201, 224, 0.1);
          }
        }
      }
    }
    .van-tabs {
      margin-bottom: 14px;
    }
    .data_table {
      .table_body {
        padding-bottom: 10px;
        .bodyItem {
          padding: 10px 0 0 0;
          .tableItem {
            &.firstItem {
              div {
                display: flex;
                align-items: center;
                font-size: 14px;
              }
              div:not(:first-child) {
                padding-left: 20px;
                font-size: 12px;
                color: #2D2E36;
              }
            }
            div {
              text-align: right;
              padding-right: 22px;
              height: 28px;
              line-height: 28px;
              font-size: 16px;
              img {
                height: 15px;
                margin-right: 6px;
                &.fold {
                    -webkit-transform-origin: 0 0;
                    -webkit-transform: rotate(-90deg) translatez(0);
                    transform-origin: 0 0;
                    transform: rotate(-90deg) translatez(0) translateX(-15px);
                  }
              }
              .van-icon {
                font-size: 12px;
              }
              &:not(:first-child) {
                font-size: 12px;
                color: #86909C;
                &.red {
                  color: #EC4343;
                }
                &.green {
                  color: #22AE43;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
