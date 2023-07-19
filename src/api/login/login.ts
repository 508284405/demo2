import request from '../../request/request'
import common from '../../request/common'

export default function login(data: any) {
    return request(
        {
            url: common.loginUrl,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data
        }
    )
}

export function refresh(id: number){
    return request(
        {
            url: common.refreshUrl + "/" + id,
            method: 'GET',
        }
    )
}