import { createRouter, createWebHistory } from "vue-router";
import Login from '@/views/login/index.vue'
// import Layout from '@/layout/index.vue'
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  // {
  //   path: "/",
  //   name: "Layout",
  //   component: Layout,
  // },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router