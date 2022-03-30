import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import LoginPageVue from "./page-components/LoginPage.vue";
import RegisterPageVue from "./page-components/RegisterPage.vue";
import HomescreenVue from "./page-components/Homescreen.vue";
import "./index.css";
import { loadCredentials } from "./API";

const routes = [
  { path: "/", component: HomescreenVue },
  { path: "/login", component: LoginPageVue },
  { path: "/register", component: RegisterPageVue },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount("#app");

// Credentials are stored in localStorage
if (loadCredentials()) {
  router.push("/");
} else {
  router.push("/login");
}
