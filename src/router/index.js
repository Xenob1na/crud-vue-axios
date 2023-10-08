import { createRouter, createWebHistory } from 'vue-router'
import ProjectCreate from '../views/ProjectCreate.vue'
import ProjectList  from '../views/ProjectList.vue'
import ProjectEdit  from '../views/ProjectEdit.vue'
import ProjectShow  from '../views/ProjectShow.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectList
    },
    {
      path: '/create',
      name: 'create',
      component: ProjectCreate
    },
    {
      path: '/create/:id',
      name: 'createID',
      component: ProjectEdit
    },
    {
      path: '/show/:id',
      name: 'show',
      component: ProjectShow
    },
  ]
})

export default router
