import Vue from 'vue'
import App from './App.vue'
import Contacts from './Pages/Contacts.vue'
import Quiz from './Pages/Quiz.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Contacts
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    }
  ]
})

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
