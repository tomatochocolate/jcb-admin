/**
 *  订单
 */
import instance from '@/api/http'

const module = '/product'
/**
 * 查询所有订单
 * @returns { Promise }
 */
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
