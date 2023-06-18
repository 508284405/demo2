import request from '../../request/request'
export function list(data: {}) {
    return request(
        {
            url: '/redis/list',
            method: 'POST',
            data
        }
    )
}
class RedisInfoVo {
    ip: string;
    port: number;
    model: number;
    createTime: number;
    constructor(ip: '', port: 0, model: 0, createTime: 0) {
        this.ip = ip
        this.port = port
        this.model = model
        this.createTime = createTime
    }
}
export {RedisInfoVo}
