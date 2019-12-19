/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 21:53
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
