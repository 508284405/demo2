import request from '../request/request'
export function login(data: any) {
    return request(
        {
            url: '/registry/login',
            method: 'POST',
            data
        }
    )
}