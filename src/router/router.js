import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import SignIn from '../components/SignIn'
import Signup from '../components/Signup'
import Profile from '../components/Profile'

Vue.use(Router)

const routes = [
  { path: '/', component: Home },
  { path: '/sign-in', component: SignIn },
  { path: '/sign-up', component: Signup },
  { path: '/user/:id',  name: 'user', component: Profile},
  { path: '*', redirect: '/' }
]

export default new Router({mode: 'history', routes})