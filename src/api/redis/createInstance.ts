import request from '../../request/request'
export function create(data: any) {
    return request(
        {
            url: '/redis/create',
            method: 'POST',
            data
        }
    )
}