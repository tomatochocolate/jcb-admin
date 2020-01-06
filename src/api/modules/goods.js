/**
 * 产品
 */
import instance from '@/api/http'

const module = '/goods'
export const store = (params) => {
    return instance.post('/goods', params)
}
export const update = (params) => {
    return instance.post('/goods/update', params)
}
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
