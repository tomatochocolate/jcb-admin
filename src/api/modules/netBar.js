/**
 * 网吧
 */
import instance from '@/api/http'

const module = '/admin'

/**
 * 查询所有网吧列表
 * @returns { Promise }
 */
export const list = (params) => {
    return instance.post(`${module}/corporation/list`, params)
}
/**
 * 新增或修改网吧信息
 * @returns { Promise }
 */
export const orupdate = (params) => {
    return instance.post(`${module}/add/orupdate`, params)
}
