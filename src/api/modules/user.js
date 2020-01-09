/**
 *  会员
 */
import instance from '@/api/http'

const module = '/member'
/**
 * 查询所有用户
 * @returns { Promise }
 */
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}

/**
 * 新建用户
 * @returns { Promise }
 */
export const store = (params) => {
    return instance.post('/users', params)
}
/**
 * 增加时长
 * @returns { Promise }
 */
export const timer = (params) => {
    return instance.post(`${module}/add_time`, params)
}
