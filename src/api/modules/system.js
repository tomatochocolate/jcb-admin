/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 21:53
 */
import instance from '@/api/http'


/**
 * 登录
 * @param { Object } params
 * @param { String } params.account - 用户名
 * @param { String } params.password
 * @returns { Promise }
 */
export const login = (params) => {
    return instance.post('/admin/login', params)
}
