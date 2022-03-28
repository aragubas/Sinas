<script setup lang="ts">
import { ref } from "vue";
import { Axios } from "axios";

let submitting = ref(false);
let errorMessage = ref("");
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

  if (response.status == 400) {
    errorMessage.value = "Invalid username or password";
    submitting.value = false;
    return;
  }

  console.log(response.data);

  submitting.value = false;
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
          v-model="username"
          :disabled="submitting"
        />

        <label for="password-input">Password</label>
        <input
          type="password"
          id="password-input"
          required
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
        <button class="button" :disabled="submitting">Register</button>

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
  width: 50%;
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

input {
  @apply bg-slate-600 text-slate-200 p-1 rounded-md;
}

input:focus {
  @apply focus:bg-slate-500 focus:outline-none text-white;
}

.button {
  @apply bg-slate-600 text-white p-1 rounded-md select-none;
}

.button:active {
  @apply bg-slate-500;
}
</style>
