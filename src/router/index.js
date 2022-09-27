import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StarView from "../views/StarView.vue";
import DetailView from "../views/DetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/stars",
      name: "stars",
      component: StarView,
    },
    {
      path: "/detail/:id",
      name: "detail",
      props: true,
      component: DetailView,
    },
  ],
});

export default router;
