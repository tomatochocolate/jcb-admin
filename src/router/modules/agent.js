/**
 * 主页 代理商
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/agent',
        meta: {
            icon: 'ios-people',
            title: '代理商管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'agent',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "agent" */'@/views/agent')
            }
        ]
    }
]
