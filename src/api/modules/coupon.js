/**
 * 卡券
 */
import instance from '@/api/http'

const module = '/card'
/**
 * 查询所有用户
 * @returns { Promise }
 */
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
