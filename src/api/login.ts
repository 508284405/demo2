import request from '../request/request'
export function login(data: any) {
    return request(
        {
            url: '/user/user/login',
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data
        }
    )
}