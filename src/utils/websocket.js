/* eslint-disable */
import { Message } from "element-ui"
import EventBus from '@/utils/bus'

export default function socket(handlerOptions) {
  let {
    onmessage,
    onopen,
    socketUrl
  } = handlerOptions
  // let socketUrl = 'ws://8.142.143.40:8885/websocket/1'
  let websocket
  if ("WebSocket" in window) {
    websocket = new WebSocket(socketUrl)
  } else {
    Message.warning("当前浏览器不支持WebSocket推送，请升级浏览器")
  }

  let heart = heartCheck(websocket)

  websocket.onerror = function() {
    console.info("Websocket服务器连接错误")
  }

  //连接成功建立的回调方法
  websocket.onopen = function() {
    console.info("Websocket连接成功")
    console.log(websocket.readyState);
    heart.start()
    onopen && onopen()
  }

  //接收到消息的回调方法
  websocket.onmessage = function(event) {
    let message = event.data //消息内容
    heart.reset() //重置心跳上传时间
    onmessage && onmessage(message) //消息业务处理
  }

  //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
  window.onbeforeunload = function() {
    websocket.close()
  }
  return websocket
}
function heartCheck(websocket) {
  return {
    timeout: 15000,
    timeoutObj: null,
    reset: function() {
      clearTimeout(this.timeoutObj)
      this.start()
    },
    start: function() {
      this.timeoutObj = setInterval(function() {
        // if(websocket.readyState==1){
        websocket.send("HeartBeat")
        console.info("Websocket发送心跳：HeartBeat")
        // }
       
      }, this.timeout)
    },
  }
}
//消息处理
export function receiveMessage(message) {
    // 消息接收后处理逻辑 接口访问 
    if (message != '连接成功') {
      let obj = JSON.parse( JSON.parse(message))
    }
}