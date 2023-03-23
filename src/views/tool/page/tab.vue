<template>
  <div>
    <van-tabs v-model="avtive" scrollspy sticky @change="changeTab">
      <van-tab v-for="index in 8" :title="'选项 ' + index" :key="index">
        <div class="item">内容 {{ index }}</div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        avtive: 1
      }
    },
    methods: {
      changeTab(e) {
        console.log(e)
      }
    }
  }
</script>
<style lang="scss">
  .van-tabs{
    .item{
      height:100px;
    }
  }
</style>
