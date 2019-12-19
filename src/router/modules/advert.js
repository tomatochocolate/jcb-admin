/**
 * 主页
 * @author 请叫我蛋蛋哥 <76573917@qq.com>
 * @created 2019/03/06 19:08
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/advert',
        meta: {
            icon: 'md-ionic',
            title: '广告管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'advert',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "advert" */'@/views/advert')
            }
        ]
    }
]
