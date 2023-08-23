import request from '../../request/request'

const count = (id: number) => {
    return request(
        {
            url: `/redis/command/count/${id}`,
            method: 'GET',
        }
    )
}

const page = (id: number, qry: {
    pageNo: number,
    pageSize: number
}) => {
    return request(
        {
            url: `/redis/command/page/${id}`,
            method: 'POST',
            data: qry
        }
    )
}

const pageCommandInfo = (id: number, qry: {
    pageNo: number,
    pageSize: number
}) => {
    return request(
        {
            url: `/redis/command/info/page/${id}`,
            method: 'POST',
            data: qry
        }
    )
}

const infoDetail = (id: number, name: string) => {
    return request(
        {
            url: `/redis/command/info/detail/${id}/${name}`,
            method: 'GET',
        }
    )
}

const docsDetail = (id: number, name: string) => {
    return request(
        {
            url: `/redis/command/docs/detail/${id}/${name}`,
            method: 'GET',
        }
    )
}

export { count, page, pageCommandInfo, infoDetail, docsDetail }