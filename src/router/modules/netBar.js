/**
 * 主页 网吧管理
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/netBar',
        meta: {
            icon: 'md-ionic',
            title: '网吧管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'netBar',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "admin" */'@/views/netBar')
            }
        ]
    }
]
