<script setup lang="ts">
import { currentUser } from "../API";
</script>

<template>
  <div class="grid mainGrid gap-4">
    <div class="flex flex-col sidebar p-2">
      <header class="flex items-center gap-3 mb-6 justify-center">
        <div class="bg-slate-600 rounded-full icon-test"></div>
        <h1 class="text-2xl text-center">@{{ currentUser.toLowerCase() }}</h1>
      </header>

      <ul class="flex flex-col gap-2">
        <li>
          <a href="#" class="button">Home</a>
        </li>

        <li>
          <a href="#" class="button">Profile</a>
        </li>
      </ul>
    </div>

    <div class="p-2 border-l border-r border-slate-700">
      <p>Sinas</p>
    </div>

    <aside class="p-2">
      <p>Ceira</p>
    </aside>
  </div>
</template>

<style scoped>
.mainGrid {
  grid-template-columns: 0.4fr 1fr 0.4fr;
  height: 100vh;
}

.icon-test {
  width: 32px;
  height: 32px;
}
</style>
