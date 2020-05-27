/**
 * 主页 运营统计
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/statistics',
        meta: {
            icon: 'ios-analytics',
            title: '运营统计',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'statistics',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "statistics" */'@/views/statistics')
            }
        ]
    }
]
