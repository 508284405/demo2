import request from '../../request/request'
export function create(data: any) {
    return request(
        {
            url: '/redis/info/create',
            method: 'POST',
            data
        }
    )
}