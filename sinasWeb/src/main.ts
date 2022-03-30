import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import LoginPageVue from "./page-components/LoginPage.vue";
import RegisterPageVue from "./page-components/RegisterPage.vue";
import "./index.css";

const routes = [
  { path: "/", component: LoginPageVue },
  { path: "/register", component: RegisterPageVue },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount("#app");
