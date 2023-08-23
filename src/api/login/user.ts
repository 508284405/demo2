import request from '../../request/request'
import common from '../../request/common'

const get = (uid: number) => {
    return request((
        {
            url: common.getuser + `/${uid}`,
            method: 'GET',
        }
    ))
}
const modifyProfilePicture = (uid: number,url: string) => {
    return request((
        {
            url: common.modifyProfilePicture,
            method: 'POST',
            data: {
                id: uid,
                profilePictureUrl: url
            }
        }
    ))
}

export { get , modifyProfilePicture}