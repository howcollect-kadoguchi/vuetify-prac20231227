// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/test',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/test',
        name: 'test',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Test.vue'),
      },
    ],
  },
  {
    path: '/testInput',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/testInput',
        name: 'testInput',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/TestInput.vue'),
      },
    ],
  },
  {
    path: '/todo',
    component: () => import('@/layouts/Todo/ToDoLayout.vue'),
    children: [
      {
        path: '/todo',
        name: 'todo',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Todo/Home.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
