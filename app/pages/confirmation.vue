<template>
  <div>
    <AppHeader />
    <div class="py-4 px-4 sm:px-10 sm:py-10 sm:w-1/2">
      <h1>Booking Confirmation</h1>
      <p>Thank you for your booking!</p>
      <h2>Booking Details</h2>
      <pre>{{ bookingDetails }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '@/store/booking';

const bookingStore = useBookingStore();
const bookingDetails = computed(() => bookingStore.$state);
</script>
