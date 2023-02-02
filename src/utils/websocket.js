/* eslint-disable */
import { Message } from "element-ui"
import EventBus from '@/utils/bus'
export class Socket {
  constructor(handlerOptions) {
    this.handlerOptions = handlerOptions
    this.heart = {}
    this.websocket = {}
    this.init()
  }
  init () {
    if ("WebSocket" in window) {
      this.websocket = new window.WebSocket(this.handlerOptions.socketUrl)
    } else {
      Message.warning("当前浏览器不支持WebSocket推送，请升级浏览器")
    }

    this.heart = this.heartCheck();
    this.websocket.onerror =()=>{
      console.info("Websocket服务器连接错误")
    }

    //连接成功建立的回调方法
    this.websocket.onopen = ()=>{
      console.info("Websocket连接成功")
      this.heart.start()
      this.handlerOptions.onopen && this.handlerOptions.onopen()
    }

    //接收到消息的回调方法
    this.websocket.onmessage = (event)=>{
      let message = event.data //消息内容
      // 已经链接并且可以通讯
      this.heart.reset() //重置心跳上传时间
      this.handlerOptions.onmessage && this.handlerOptions.onmessage(message) //消息业务处理

    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = (err)=> {
      console.info("window、document 和它们的资源即将卸载")
      this.websocket.close()
    }

    this.websocket.onclose = (event)=> {
      console.log(event)
      this.heart.clear()
      console.log("WebSocket is closed now.");
    }
  }
  heartCheck () {
    const _this = this;
    return {
      timeout: 15000,
      timeoutObj: null,
      reset: function () {
        this.clear()
        this.start()
      },
      start: function () {
        if (_this.websocket.readyState === 1) {
          this.timeoutObj = setTimeout(function () {
            _this.websocket.send("HeartBeat")
            console.info("Websocket发送心跳：HeartBeat")
          }, this.timeout)
        }else{
          this.clear()
        }
      },
      clear:function(){
        clearTimeout(this.timeoutObj)
      }
    }
  }
}
//消息处理
export function receiveMessage (message) {
  // 消息接收后处理逻辑 接口访问 
  if (message != '连接成功' && message != "HeartBeat") {
    const data = JSON.parse(message)
    if (data.data.alarm.way == '2') {
      EventBus.$emit('alarmAudio')
    }
    return data;
  }
}

// 下载录像进度查询
export function receiveProgress (message) {
  if (message != '连接成功' && message != "HeartBeat") {
    const data = JSON.parse(message)
    if (data.data.percentage == '100.00') {
      // 刷新列表
      EventBus.$emit('updataList', data.data.id)
    } else {
      EventBus.$emit('updataListProgress', data.data)
    }
    return data
  }
}