/**
 * 主页 反馈管理
 */
import Main from '@/views/other/main'

export default [
    {
        path: '/feedback',
        meta: {
            icon: 'md-notifications',
            title: '反馈管理',
            permissions: [ 'guest' ]
        },
        component: Main,
        children: [
            {
                name: 'feedback',
                path: '',
                meta: {
                    menu: false
                },
                component: () => import(/* webpackChunkName: "feedback" */'@/views/feedback')
            }
        ]
    }
]
