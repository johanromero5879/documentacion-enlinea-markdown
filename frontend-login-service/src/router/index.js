import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../components/Login.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: async (to, from, next) => {
      try{
        const response = await fetch("http://localhost:3000/session", { credentials: "include" })

        if(response.status === 200)
          window.location = "http://localhost:8010/dashboard"
        
      }catch(ex){
        //nothing
      }
      next()
    }
  },
  {
    path: '/',
    redirect: { name: "login" }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
