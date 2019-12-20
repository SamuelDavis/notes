import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import StyleGuide from '../views/StyleGuide'
import NotFound from '../views/NotFound'

Vue.use(VueRouter);

export const routes = [Home, StyleGuide]
    .map((component, i) => ({
        component,
        name: component.name || `page${i}`,
        path: i === 0 ? '/' : `/${component.name || `page${i}`}`,
        meta: {
            global: true
        },
        alias: component.name === 'home' ? '/home' : undefined
    }))
    .concat(new Array(5).fill(undefined).map((_, i) => {
        return {
            component: NotFound,
            path: `/example-${i}`,
            name: `example-${i}`,
            meta: {global: true}
        };
    }))
    .concat([{
        component: NotFound,
        name: 'page-missing',
        path: '/404',
        alias: '*'
    }]);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
