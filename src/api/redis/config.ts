import request from '../../request/request'

const page = (data: {}) => {
    return request(
        {
            url: `/redis/config/page/`,
            method: 'POST',
            data: data
        }
    )
}

export {page}