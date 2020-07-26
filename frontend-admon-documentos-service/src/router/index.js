import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import Document from '../components/Document.vue'
import Welcome from '../views/Welcome.vue'

import { logout, getSession } from "../utils"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/dashboard"
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path:"",
        component: Welcome,
      },
      {
        path:"document",
        name: "new-document",
        component: Document,
        children: [{ path: ":id", name: "edit-document" }]
      }
    ],

    beforeEnter: async (to, from, next) => {
      try {
        await getSession()
        next()
      } catch (ex) {
        await logout()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
