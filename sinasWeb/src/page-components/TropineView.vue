<script setup lang="ts">
import { useRoute } from "vue-router";

const tropineID = useRoute().params["tropineID"];
</script>

<template>
  <h1>{{ tropineID }}</h1>
</template>
