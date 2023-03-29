<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isMobile: false
      }
    },
    methods: {
      checkIsMobile() {
        setTimeout(() => {
          this.isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? true : false
          document.querySelector("body").className = this.isMobile ? 'mobile' : 'pc'
        })
      }
    },
    created() {
      this.checkIsMobile()
      window.onresize = () => {
        this.checkIsMobile()
      }
    }
  }
</script>
<style lang="scss">
  h1, h2, h3, h4, h5, h6, ul {
    margin: 0;
    padding: 0;
  }
  .pc #app {
    width: 375px;
    position: fixed;
    height: 80vh;
    min-height: 400px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: rgba(0, 0, 0, .7) solid 8px;
    border-radius: 6px;
    overflow-y: hidden;
    background: #f8f8f8;
  }
  body {
    color: #333333;
    margin: 0;
    padding: 0;
    font-size: 0.24rem;
    &.pc {
      background-image: url('@/assets/home/bg.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      height: 100vh;
    }
    &.mobile {
      background: #f8f8f8;
    }
  }
  //禁止复制
  .noCopy {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .van-swipe {
    img {
      pointer-events: none;
    }
  }
</style>