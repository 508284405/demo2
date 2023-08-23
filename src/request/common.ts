const baseURL = 'http://192.168.3.60:8081'

const loginUrl = '/user/user/login'
const registerUrl = '/user/registry/account'
const refreshUrl = '/user/user/refreshToken'
const getuser = '/user/user/get'
const uploadUrl = baseURL + '/generic/cos/upload'
const modifyProfilePicture = '/user/user/modify/profilePicture'
export default {
    loginUrl,
    registerUrl,
    refreshUrl,
    getuser,
    uploadUrl,
    baseURL,
    modifyProfilePicture
}