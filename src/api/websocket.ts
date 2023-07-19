import { baseURL } from "../request/request";

const socket = new WebSocket(`ws://${baseURL.replace("http://","")}/redis/redis/reallog`)
socket.onerror = (error) => {
    console.log("websocket 发生错误", error)
}
socket.onclose = (e) => {
    console.log("websocket 连接已经关闭", e)
}
export default socket