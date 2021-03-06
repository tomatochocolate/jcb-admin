import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'

import store from '@/store'
import ViewUI from '@/libs/vendors/view-design'
import Layout from '@/views/other/layout'
import { cancelPending } from '@/api/helper'


import routes from './routes'
import other from './other'

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    base: process.env.VUE_APP_ROUTER_BASE_URL,
    routes: [
        {
            path: '',
            component: Layout,
            children: [
                ...routes
            ]
        },
        ...other
    ]
})
router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start()
    // 路由变化断开上一个页面所有请求
    cancelPending(from.fullPath)
    if (!store.state.app.token && to.name !== 'login') {
        next({ name: 'login', replace: true })
        return
    }
    next()
})
router.afterEach((to, from) => {
    ViewUI.LoadingBar.finish()
})
sync(store, router)
export default router
