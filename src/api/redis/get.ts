import request from '../../request/request'
export function get(id: number) {
    return request(
        {
            url: '/redis/info/get/' + id,
            method: 'GET',
        }
    )
}
