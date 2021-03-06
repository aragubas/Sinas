import { Axios, AxiosRequestHeaders, AxiosResponse } from "axios";
import { ref } from "vue";

export let currentUser = ref("");
export let currentPassword = ref("");

export function setCredentials(user: string, password: string) {
  currentUser.value = user;
  currentPassword.value = password;
}

export const api_client = new Axios({ baseURL: "http://localhost:3333" });

export function getAuthorizationHeaderString(): string {
  return `Basic ${btoa(currentUser.value + ":" + currentPassword.value)}`;
}

export function getAuthorizationHeader(): AxiosRequestHeaders {
  return { Authorization: getAuthorizationHeaderString() };
}

export function saveCredentials() {
  if (currentUser.value == "" || currentPassword.value == "") {
    return;
  }

  localStorage.setItem("user", currentUser.value);
  localStorage.setItem("password", currentPassword.value);
}

export async function checkCredentials(): Promise<boolean> {
  const response = await api_client.get("/user/", { headers: getAuthorizationHeader() });
  console.log("tropine");
  return response.status == 200;
}

export async function loadCredentials(): Promise<boolean> {
  if (localStorage.getItem("user") == null || localStorage.getItem("password") == null) {
    return false;
  }

  currentUser.value = localStorage.getItem("user") as string;
  currentPassword.value = localStorage.getItem("password") as string;

  return checkCredentials();
}
