import request from '../../request/request'
import common from '../../request/common'
export function register(data: any) {
    return request(
        {
            url: common.registerUrl,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data
        }
    )
}