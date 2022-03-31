<script setup lang="ts">
import { ref } from "vue";
import { Axios, AxiosResponse } from "axios";
import OperationResponse from "../ResponseModels/OperationResponse";
import { api_client, getAuthorizationHeader, getAuthorizationHeaderString, saveCredentials } from "../API";
import { router } from "../main";

let submitting = ref(false);
let message = ref("");
let messageIsSuccess = ref(false);
let username = ref("");
let email = ref("");
let password = ref("");

async function submitRegisterForm() {
  const request = {
    username: username.value.toLowerCase(),
    email: email.value,
    password: password.value,
  };

  const response = await api_client.post("/user/", JSON.stringify(request), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Handles incorrect credentials
  if (response.status == 400) {
    const data = JSON.parse(response.data.toString()) as OperationResponse;
    let response_message = "Unknown error";

    switch (data.message) {
      case "user_already_exists":
        response_message = "User already exists";
        break;
    }

    message.value = response_message;
    submitting.value = false;
    return;
  }

  if (response.status == 200) {
    message.value = "Logging in...";
    messageIsSuccess.value = true;
    saveCredentials();

    router.push("/");
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
          submitRegisterForm();
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

        <label for="email-input">Email</label>
        <input
          type="email"
          id="email-input"
          required
          placeholder="Email Address"
          autocomplete="email"
          class="input"
          v-model="email"
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
        <button class="button flex-1" :disabled="submitting">Register</button>

        <div class="loading-overlay" :class="submitting ? 'opacity-95 pointer-events-auto' : 'opacity-0 pointer-events-none'">
          <p class="text-white animate-pulse text-xl animate">Loading...</p>
        </div>

        <footer class="text-xs mt-4">
          <p>
            Already have an account?
            <router-link to="/login" class="text-blue-500">Log in</router-link>
          </p>
        </footer>
      </form>
    </div>
  </div>
</template>
