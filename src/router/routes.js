/**
 *
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/17 22:17
 */
import home from './modules/home'
import user from './modules/user'
import advert from './modules/advert'
import node from './modules/node'
import agent from './modules/agent'
import goods from './modules/goods'
import order from './modules/order'
import feedback from './modules/feedback'
import appVersion from './modules/app_version'
import statistics from './modules/statistics'

export default [
    ...home,
    ...user,
    ...advert,
    ...node,
    ...agent,
    ...goods,
    ...order,
    ...feedback,
    ...appVersion,
    ...statistics
]
