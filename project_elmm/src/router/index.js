import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from 'components/goods/goods.vue'
Vue.use(VueRouter)

let routes = [{
  path: '/',
  redirect: '/goods'
}, {
  path: '/goods',
  component: Goods
}, {
  path: '/ratings',
  component: () => import('components/ratings/ratings')
}, {
  path: '/seller',
  component: () => import('components/seller/seller')
}]

export default new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})
