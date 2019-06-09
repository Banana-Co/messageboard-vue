import Vue from 'vue'
import Router from 'vue-router'
import MessageFlow from '@/components/MessageFlow'
import MessageDetail from '@/components/MessageDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/messageFlow'
    },
    {
      path: '/messageFlow',
      name: 'MessageFlow',
      component: MessageFlow
    },
    {
      path: '/messageDetail/:id',
      name: MessageDetail,
      component: MessageDetail
    }
  ]
})
