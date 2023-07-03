import request from '../../request/request'
export function connect(data: {}) {
    return request(
        {
            url: '/redis/info/connect',
            method: 'POST',
            data
        }
    )
}
