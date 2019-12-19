/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/user',
        meta: {
            icon: 'md-person',
            title: '用户管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'user',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "user" */'@/views/user')
            }
        ]
    }
]
