import request from '../../request/request'
export function list(data: {}) {
    return request(
        {
            url: '/redis/info/list',
            method: 'POST',
            data
        }
    )
}
class RedisInfoVo {
    id: number;
    ip: string;
    port: number;
    model: number;
    createTime: number;
    groupId: number;
    hasVos?: boolean
    vos?: RedisInfoVo[]
    constructor(id: number, ip: string, port: number, model: number, createTime: number, groupId: number) {
        this.id = id
        this.ip = ip
        this.port = port
        this.model = model
        this.createTime = createTime
        this.groupId = groupId
    }
}
export { RedisInfoVo }
