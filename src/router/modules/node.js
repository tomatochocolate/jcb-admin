/**
 * 主页 节点管理
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/node',
        meta: {
            icon: 'md-git-network',
            title: '节点管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'node',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "node" */'@/views/node')
            }
        ]
    }
]
