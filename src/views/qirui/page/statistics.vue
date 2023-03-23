<template>
  <div class="statistics">
    <!-- 头部 -->
    <div class="headerBox">
      <img src="@/assets/logo.png">
      <van-tabs v-model="activeTime" background="#009FB1" color="#fff" title-active-color="#fff" title-inactive-color="#fff" line-height="2px" line-width="24px" @click="changeTime">
        <van-tab title="日" :name="1"></van-tab>
        <van-tab title="周" :name="2"></van-tab>
        <van-tab title="月" :name="3"></van-tab>
        <van-tab title="季" :name="4"></van-tab>
        <van-tab title="年" :name="5"></van-tab>
        <van-tab title="自定义" :name="6"></van-tab>
      </van-tabs>
    </div>
    <!-- 销售总览 -->
    <saleView></saleView>
    <!-- 趋势 -->
    <div class="dataContainer">
      <van-tabs v-model="activeTab" color="#009FB1" title-active-color="#009FB1" title-inactive-color="#86909C" line-height="2px" line-width="24px" scrollspy sticky class="stickyTab" @change="changeTab">
        <van-tab title="趋势" :name="1">
          <trendTab></trendTab>
        </van-tab>
        <van-tab title="战区数据" :name="2">
          <dataTab :dataType="1"></dataTab>
        </van-tab>
        <van-tab title="渠道数据" :name="3">
          <dataTab :dataType="2"></dataTab>
        </van-tab>
        <van-tab title="车型数据" :name="4">
          <dataTab :dataType="3"></dataTab>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
  import saleView from './saleView'
  import trendTab from './trendTab'
  import dataTab from './dataTab'
  export default {
    components: {
      saleView,
      trendTab,
      dataTab
    },
    data() {
      return {
        activeTime:1,
        activeTab: 1
      }
    },
    methods: {
      changeTime(e) {},
      changeTab(e) {},
    }
  }
</script>
<style lang="scss">
  .statistics{
    .headerBox{
      height:40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #009FB1;
      padding: 0 0 0 12px;
      position: fixed;
      top:0;
      left: 0;
      right: 0;
      z-index: 10;
      img{
        height:24px;
      }
      .van-tabs{
        .van-tabs__wrap{
          height: 36px;
        }
      }
    }
    .dataContainer {
      background: #FFFFFF;
      box-shadow: 0px 2px 10px 0px rgba(214, 214, 214, 0.5);
      padding: 0 10px;
      border-radius: 8px;
      color: #2D2E37;
      margin-bottom: 12px;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 46px;
        .left {
          display: flex;
          align-items: center;
          font-size: 14px;
          .van-icon {
            color: #989898;
            margin: 2px 0 0 4px;
          }
        }
        .right {
          color: #989898;
          font-size: 12px;
        }
      }
      .van-popup{
        width: 250px;
        border-radius: 10px;
        padding:10px;
        font-size:14px;
        .popup_title{
          line-height:30px;
        }
        .popup_content{
          max-height: 60vh;
          overflow-y: auto;
        }
      }
    }
  }
</style>
