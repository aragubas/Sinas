<script setup lang="ts">
import { ref } from "vue";
import { Axios, AxiosResponse } from "axios";
import OperationResponse from "../ResponseModels/OperationResponse";

let submitting = ref(false);
let message = ref("");
let messageIsSuccess = ref(false);
let username = ref("");
let email = ref("");
let password = ref("");

async function submitLoginForm() {
  const client = new Axios({ baseURL: "http://localhost:3333" });
  const authenticationHeader = {
    Authorization: "Basic " + btoa(username.value + ":" + password.value),
  };

  const response = await client.get("/user/", {
    headers: authenticationHeader,
  });

  // Handles incorrect credentials
  if (response.status == 400) {
    const data = JSON.parse(response.data.toString()) as OperationResponse;
    let response_message = "Unknown error.";

    switch (data.message) {
      case "invalid_credentials":
        response_message = "Incorrect username or password";
        break;
    }

    message.value = response_message;
    submitting.value = false;
    return;
  }

  // Handles user not found
  if (response.status == 404) {
    message.value = "User not found";
    submitting.value = false;
    return;
  }

  if (response.status == 200) {
    message.value = "Successfully Registed, Logging in...";
    messageIsSuccess.value = true;

    return;
  }

  submitting.value = false;
  message.value = "Unknown error";
}
</script>

<template>
  <div class="center-container">
    <div class="bg-slate-700 text-slate-200 p-4 rounded-md relative in-animation">
      <form
        @submit.prevent="
          submitting = true;
          message = '';
          submitLoginForm();
        "
        class="form"
      >
        <label for="username-input">Username</label>
        <input
          type="text"
          id="username-input"
          required
          placeholder="Username"
          autocomplete="username"
          class="input"
          v-model="username"
          :disabled="submitting"
        />

        <label for="password-input">Password</label>
        <input
          type="password"
          id="password-input"
          required
          class="input"
          placeholder="Password"
          autocomplete="password"
          v-model="password"
          :disabled="submitting"
        />

        <p
          class="text-center text-lg mt-2 mb-2"
          :class="messageIsSuccess ? 'text-green-400 z-10' : 'text-red-400'"
          v-if="message != ''"
        >
          {{ message }}
        </p>

        <br v-if="message == ''" />
        <button class="button flex-1" :disabled="submitting">Login</button>

        <div class="loading-overlay" :class="submitting ? 'opacity-95 pointer-events-auto' : 'opacity-0 pointer-events-none'">
          <p class="text-white animate-pulse text-xl animate">Loading...</p>
        </div>

        <footer class="text-xs mt-4">
          <p>
            Need an account?
            <router-link to="register" class="text-blue-500">Register</router-link>
          </p>
        </footer>
      </form>
    </div>
  </div>
</template>
