<template>
  <div class="tipPopup">
    <van-popup v-model="tipShow">
      <div class="popup_title"><van-icon name="warning" color="#f59a23"/>Tips提示</div>
      <div class="popup_content">
        <div v-for="(item,index) in tip" :key="index">{{item.label}}.{{item.value}}</div>
      </div>
      <van-button @click="tipShow=false" color="#009FB1">知道了</van-button>
    </van-popup>
  </div>
</template>
<script>
  import * as allTip from './tip'
  export default {
    data() {
      return {
        tip:[],
        tipShow:false
      }
    },
    methods:{
      open(name){
        console.log(Object.keys(allTip[name]))
         this.tip=Object.keys(allTip[name]).map((e) => {
          return {
             label: e,
             value: allTip[name][e]
          }
        })
        console.log(this.tip)
        this.tipShow=true
      }
    }
  }
</script>
<style lang="scss">
  .tipPopup {
    .van-popup{
      width: 250px;
      border-radius: 10px;
      padding:10px 16px;
      color:#2D2E36;
      .popup_title{
        line-height:30px;
        font-size: 16px;
        font-weight: 600;
        .van-icon{
          margin-right:4px;
        }
      }
      .popup_content{
        max-height: 60vh;
        overflow-y: auto;
        font-size: 14px;
        color:#666;
        div{
          margin-bottom:10px;
        }
      }
      .van-button{
        width: 100%;
        height:32px;
      }
    }
  }
</style>
