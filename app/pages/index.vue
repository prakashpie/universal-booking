<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold mb-8">Select a service</h1>
    <div class="flex space-x-4">
      <NuxtLink to="/salon">
        <Button class="cursor-pointer">
          Salon
        </Button>
      </NuxtLink>
      <NuxtLink to="/rental">
        <Button class="cursor-pointer">
          Rental
        </Button>
      </NuxtLink>
      <NuxtLink to="/class">
        <Button class="cursor-pointer">
          Class
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Button} from "~/components/ui/button";
</script>
