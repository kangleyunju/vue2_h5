<template>
  <div class="room">
    <van-field v-model="url" center clearable label="链接" placeholder="输入链接" label-width="0.8rem" class="top">
      <template #button>
        <van-button size="small" type="primary" @click="reset">设置链接</van-button>
      </template>
    </van-field>
    <div class="listBox">
      <div v-for="(item,index) in list" :key="index"><span>{{item.type=='system'?'系统':item.nickname}}:</span>{{item.data}}</div>
    </div>
    <van-field v-model="word" center clearable placeholder="输入你想说的话" class="bottom" @keyup.enter.native="sendWord">
      <template #button>
        <van-button size="small" type="primary" @click="sendWord">发送</van-button>
      </template>
    </van-field>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        url: 'localhost:8000',
        websocket: null,
        list: [],
        timer:null,
        word:'',
        name:'',//游客名称
        isOpen:false
      }
    },
    mounted() {
      this.name='游客'+ (new Date().getTime()+'').slice(-4)
      this.openWebsocket()
    },
    destroyed() {
      this.closeWebsocket()
    },
    methods: {
      sendWord(){
        this.sendMeg({
          type:"say",
          data:this.word,
          nickname:this.name
        })
        this.word=''
      },
      closeWebsocket(){
        this.websocket.close()
        clearInterval(this.timer)
        this.timer=null
      },
      reset(){
        this.closeWebsocket()
        setTimeout(()=>{
          this.$toast.loading({
            message: '重连中...',
            forbidClick: true,
          })
          setTimeout(()=>{
            this.openWebsocket()
            this.$toast.clear()
          },2000)
        },2000)
      },
      sendMeg(e) {
        if(this.isOpen) {
          this.websocket.send(JSON.stringify(e))
        }else{
          this.$toast("websocket已关闭,请刷新页面")
        }
      },
      openWebsocket() {
        if (typeof WebSocket === "undefined") {
          this.$toast("您的浏览器不支持websocket")
        } else {
          let protocol = window.location.protocol == "https:" ? 'wss' : 'ws'
          let url = `${protocol}://`+this.url
          // 创建websocket
          this.websocket = new WebSocket(url)
          // 建立连接
          this.websocket.onopen = () => {
            this.$toast("创建websocket成功")
            this.isOpen=true
            // 登录
            this.sendMeg({
              nickname: this.name,
              type: 'login'
            })
            //设置心跳
            this.timer=setInterval(()=>{
              this.sendMeg({
                type: 'ping'
              })
            },5000)
          }
          // 客户端接收服务端返回的数据
          this.websocket.onmessage = evt => {
            let back=JSON.parse(evt.data)
            if(back.type!='pong'){
              this.list.push(JSON.parse(evt.data))
            }
          }
          // 发生错误时
          this.websocket.onerror = evt => {
            console.log("websocket错误：", evt)
            this.$toast("websocket错误")
            clearInterval(this.timer)
            this.timer=null
          }
          // 关闭连接
          this.websocket.onclose = evt => {
            console.log("websocket关闭：", evt)
            this.isOpen=false
            this.$toast("websocket关闭了")
            clearInterval(this.timer)
            this.timer=null
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .room {
    padding: 53px 0;
    .listBox {
      padding: 0.2rem;
      height: calc(100vh - 106px);
      box-sizing: border-box;
      overflow-y: auto;
      div{
        font-size: 0.3rem;
        line-height: 0.4rem;
        word-break: break-all;
        span{
          color:#ff5500;
          margin-right: 0.1rem;
        }
      }
    }
    .van-field{
      position: fixed;
    }
    .top{
      top: 0;
    }
    .bottom{
      bottom: 0;
    }
  }
</style>