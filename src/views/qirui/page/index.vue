<template>
  <div class="home">
    <statistics/>
  </div>
</template>

<script>
  import statistics from './statistics'
  export default {
    components: {
      statistics
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    background: #F7F7F9;
    padding: 12px;
    .home-label {
      margin-bottom: 16px;
    }
    ::v-deep .box {
      >.title {
        position: relative;
        font-size: 16px;
        color: #2D2E36;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
        }
        .right {
          display: flex;
          align-items: center;
        }
        .icon {
          width: 18px;
          height: 18px;
          vertical-align: middle;
          margin-right: 8px;
        }
        .explain {
          margin-left: 4px;
        }
      }
    }
  }
</style>