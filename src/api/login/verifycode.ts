import request from '../../request/request'
export function verifyCodeImage(clientId: Number) {
    return request(
        {
            url: '/user/verifyCode/image/' + clientId,
            method: 'GET',
            responseType: 'arraybuffer'
        }
    )
}