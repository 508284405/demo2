import request from '../../request/request'
import common from '../../request/common'

export function login(data: any) {
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