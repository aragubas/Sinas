<script setup lang="ts">
import { computed, ref } from "vue";

let composeText = ref("");
let followersOnly = ref(false);
let submitting = ref(false);
let errorMessage = ref("");

async function submit() {
  if (composeText.value == "" || composeText.value.length < 2) {
    errorMessage.value = "A tropine should not be empty or less than 2 characters.";
    submitting.value = false;

    return;
  }

  submitting.value = false;
}

const charCount = computed(() => {
  return `${composeText.value.length.toString().padStart(3, "0")}/240`;
});
</script>

<template>
  <div class="center-container">
    <div class="bg-slate-700 p-4 rounded-md in-animation relative">
      <header class="flex justify-between mb-4">
        <h1 class="text-2xl">Compose</h1>
        <button class="button" @click="$emit('close-dialog')">X</button>
      </header>

      <form
        class="form"
        @submit.prevent="
          submitting = true;
          submit();
        "
      >
        <textarea class="input w-full h-56 resize-none font-mono" v-model="composeText" maxlength="240"></textarea>
        <p class="self-end font-mono" :class="composeText.length > 200 ? 'text-red-400' : ''">{{ charCount }}</p>
        <div class="flex gap-2 items-center">
          <input type="radio" class="input-radio" r id="followers-only-radio" />
          <label for="followers-only-radio">Followers Only</label>
        </div>

        <p class="text-center text-lg mt-2 mb-2 text-red-400" v-if="errorMessage != ''">
          {{ errorMessage }}
        </p>

        <br v-if="errorMessage == ''" />

        <button class="button">Tropine</button>
      </form>

      <div class="loading-overlay" :class="submitting ? 'opacity-95 pointer-events-auto' : 'opacity-0 pointer-events-none'">
        <p class="text-white animate-pulse text-xl animate">Loading...</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
