import request from '../../request/request'

const count = (id: number)=>{
    return request(
        {
            url: `/redis/info/count/${id}`,
            method: 'GET',
        }
    )
}

const page = (id:number,qry : {
    pageNo : 1,
    pageSize: 10
}) =>{
    return request(
        {
            url: `/redis/info/page/${id}`,
            method: 'POST',
            data: qry
        }
    )
}

export {count,page}