/**
 * 卡券
 */
import instance from '@/api/http'

const module = '/coupon'
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
