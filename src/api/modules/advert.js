/**
 * 广告
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/21 21:53
 */
import instance from '@/api/http'

const module = '/advert'
export const list = (params) => {
    return instance.post(`${module}/list`, params)
}
