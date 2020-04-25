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
/**
 * 生成卡券
 * @returns { Promise }
 */
export const create = (params) => {
    return instance.post(`${module}/generate`, params)
}
/**
 * 启用，禁用
 * @returns { Promise }
 */
export const update = (params) => {
    return instance.post(`${module}/update`, params)
}
/**
 * 生成卡券
 * @returns { Promise }
 */
export const card = (params) => {
    return instance.post(`/admin/export/card`, params)
}
