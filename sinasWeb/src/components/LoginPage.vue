<script setup lang="ts">
import { ref } from "vue";
import { Axios, AxiosResponse } from "axios";
import { Tropinete } from "../main";

let submitting = ref(false);
let errorMessage = ref("");
let username = ref("");
let email = ref("");
let password = ref("");

interface UserOperationResponse {
  status: string;
  message: string;
}

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
    const data = JSON.parse(response.data.toString()) as UserOperationResponse;
    let message = "Unknown error.";

    switch (data.message) {
      case "invalid_credentials":
        message = "Incorrect username or password";
        break;
    }

    errorMessage.value = message;
    submitting.value = false;
    return;
  }

  // Handles user not found
  if (response.status == 404) {
    errorMessage.value = "User not found";
    submitting.value = false;
    return;
  }

  submitting.value = false;
  errorMessage.value = "Unknown error.";
}
</script>

<template>
  <div class="center-container">
    <div
      class="bg-slate-700 text-slate-200 p-4 rounded-md relative in-animation"
    >
      <form
        @submit.prevent="
          submitting = true;
          errorMessage = '';
          submitLoginForm();
        "
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
          class="text-red-400 text-center text-lg mt-2 mb-2"
          v-if="errorMessage != ''"
        >
          {{ errorMessage }}
        </p>
        <br v-if="errorMessage == ''" />
        <button class="button flex-1" :disabled="submitting">Login</button>

        <div
          class="loading-overlay"
          :class="
            submitting
              ? 'opacity-95 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          "
        >
          <p class="text-white animate-pulse text-xl animate">Loading...</p>
        </div>

        <footer class="text-xs mt-4">
          <p>
            Need an account?
            <a href="" class="text-blue-500">Register</a>
          </p>
        </footer>
      </form>
    </div>
  </div>
</template>

<style scoped>
@keyframes inAnimation {
  from {
    transform: scale(95%);
    opacity: 0;
  }
  to {
    transform: scale(100%);
    opacity: 1;
  }
}

.in-animation {
  animation: inAnimation 0.35s cubic-bezier(0.5, -0.07, 0.22, 1);
}

form {
  display: flex;
  min-width: 300px;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
}

.loading-overlay {
  transition: opacity 0.3s cubic-bezier(0.33, 0.25, 0.32, 0.99);
  @apply bg-slate-700 bg-opacity-95 left-0 right-0 top-0 bottom-0 rounded-md;

  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
