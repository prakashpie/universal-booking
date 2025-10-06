<template>
  <div class="flex items-center flex-col justify-center">
    <AppHeader class="flex-1 w-full" />
    <div class="py-4 px-4 sm:px-10 sm:py-10 sm:w-1/2">
      <BookingFlow :vertical="$route.params.vertical" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BookingFlow from '@/components/BookingFlow.vue';
import AppHeader from "@/components/AppHeader.vue";
</script>
