export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    props: true,
    components: {
      default: () => import('../views/todo/todo.vue'),
      foot: () => import('../layout/footer.jsx')
    }
  },
  {
    path: '/login',
    components: {
      default: () => import('../views/login/login.vue'),
      foot: () => import('../layout/footer.jsx')
    }
  }
]
