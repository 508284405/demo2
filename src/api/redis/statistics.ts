import { id } from 'element-plus/es/locale'
import request from '../../request/request'
export function statistics(id: number, name: string) {
    return request(
        {
            url: `/redis/info/statistics`,
            method: 'POST',
            data: {
                id: id,
                properties: name
            }
        }
    )
}