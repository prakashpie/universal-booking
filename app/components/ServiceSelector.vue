<template>
  <div>
    <RadioGroup :model-value="bookingStore.service" @update:model-value="selectService">
      <legend class="text-lg font-semibold mb-2">{{ configStore.config?.copy.servicesLabel }}</legend>
      <div v-if="services && services.length > 0" class="h-64 overflow-y-auto border rounded-md p-2">
        <div v-for="serviceItem in services" :key="serviceItem.id" class="flex items-center mb-2">
          <RadioGroupItem :id="serviceItem.id" :value="serviceItem" />
          <label :for="serviceItem.id" class="ml-2 block text-sm text-text">{{ serviceItem.name }}</label>
        </div>
      </div>
      <div v-else>
        <p>No services available.</p>
      </div>
    </RadioGroup>
    <Button class="mt-4" @click="$emit('next')">{{ configStore.config?.copy.cta }}</Button>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import { useBookingStore } from '@/store/booking'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { computed } from 'vue'

defineEmits(['next'])

const configStore = useConfig()
const bookingStore = useBookingStore()

const services = computed(() => configStore.config?.catalog || [])

function selectService(service: any) {
  bookingStore.selectService(service)
}
</script>
