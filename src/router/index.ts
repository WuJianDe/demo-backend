import { createRouter, createWebHistory } from "vue-router";
import Login from '@/views/login/index.vue'
import Layout from '@/layout/index.vue'
import Dashboard from '@/views/dashboard/index.vue'
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "後台 - 登入畫面" }
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "dashboard",
        meta: { title: "後台 - 儀錶板" },
        components:{
          pages: Dashboard,
        }
      }
    ]
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to: any, from, next) => {
  document.title = to.meta.title;
  next();
})
export default router