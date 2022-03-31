import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import LoginPageVue from "./page-components/LoginPage.vue";
import RegisterPageVue from "./page-components/RegisterPage.vue";
import HomescreenVue from "./page-components/Homescreen.vue";
import TropineViewVue from "./page-components/TropineView.vue";
import "./index.css";
import { loadCredentials } from "./API";

const routes = [
  { path: "/", component: HomescreenVue, children: [{ path: "tropine/:tropineID", component: TropineViewVue }] },
  { path: "/login", component: LoginPageVue },
  { path: "/register", component: RegisterPageVue },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount("#app");

// Credentials are stored in localStorage
if (await loadCredentials()) {
  router.push("/");
} else {
  router.push("/login");
}
