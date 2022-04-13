<template>
  <div id="app">
    <router-view />
    
  </div>
</template>

<script>
import { receiveMessage } from '@/utils/websocket'
import socket from '@/utils/websocket'
import { mapState } from 'vuex'
import EventBus from '@/utils/bus'
export default {
  name: 'App',
  data() {
    return {
      websocket: null,
    }
  },
  // 创建websocket连接,挂载到 window 对象下
  // ws://192.168.0.129:8083/analysis/websocket/getCount
  created(){
    window.socket = socket({
      "onmessage":(res)=>{},
      "onopen":(res)=>{},
      "socketUrl":"ws://192.168.0.134:8083/analysis/websocket/getCount"
    })
  },
  computed: {
    
  },
  watch: {
    $route(to, from) {
      if (to.path === '/login') {
        // setTimeout(this.closeWebsocket(), 300)
      }
    },
    usertoken: {
      immediate: true,
      handler(newV) {
        if (newV) {
          // if (newV !== '') {
          //   this.websocket = socket({ onmessage: this.receiveMessage })
          // } else {
          //   this.closeWebsocket()
          // }
        }
      }
    },
  },
  mounted() {
    EventBus.$on('cancelWS', () => {
      this.closeWebsocket()
    })
  },
  destroyed() {
    document.body.removeEventListener('mousedown', () => {})
  },
  methods: {
    receiveMessage,
    closeWebsocket() {
      if (this.websocket) {
        this.websocket.close()
      }
    },
  }
}
</script>
<style lang="scss" scoped>
#app {}
.tipalerm-enter-active {
  transition: 0.5s;
}
.tipalerm-enter {
  transform: translateX(200px);
}
.tips {
  width: 160px;
  height: 120px;
  font-size: 14px;
  letter-spacing: 1px;
  background: #fff;
  box-shadow: 0px 2px 14px #888888;
  border-radius: 5px;
  padding: 4px 16px 16px 16px;
  position: fixed;
  text-align: center;
  bottom: 0px;
  right: 0px;
}
</style>
