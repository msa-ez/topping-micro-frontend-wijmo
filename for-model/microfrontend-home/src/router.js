forEach: Model
fileName: router.js
path: microfrontend-home/src
---
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Home from './components/Home'

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
    ]
})
