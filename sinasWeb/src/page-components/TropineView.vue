<script setup lang="ts">
import { ref, Ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { api_client } from "../API";

interface Tropine {
  tropineContent: string;
  author: {
    username: string;
    email: string;
    id: string;
  } | null;
}

const tropineID = useRoute().params["tropineID"];
let currentTropine: Ref<Tropine | null> = ref(null);

async function getTropineData() {
  const request = {
    tropineID: tropineID,
  };

  const response = await api_client.get(`/tropine/${tropineID}`);

  if (response.status === 200) {
    currentTropine.value = JSON.parse(response.data) as Tropine;
    console.log();
  }
}

getTropineData();
</script>

<template>
  <main class="">
    <div v-if="currentTropine" class="flex flex-col gap-4 h-full p-2">
      <header class="flex justify-between">
        <div class="flex gap-2 items-center">
          <div class="bg-slate-600 rounded-full icon-test"></div>
          <p>@{{ currentTropine?.author?.username }}</p>
        </div>
      </header>

      <article class="bg-slate-700 p-4 font-mono rounded-md">
        <p>{{ currentTropine?.tropineContent }}</p>
      </article>
    </div>

    <div v-else class="p-6">
      <h2 class="text-2xl animate-pulse text-center">Loading Tropine...</h2>
    </div>
  </main>
</template>

<style scoped>
.icon-test {
  width: 32px;
  height: 32px;
}
</style>
