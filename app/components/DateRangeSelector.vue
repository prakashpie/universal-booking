<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-2">{{ dateRangeLabel }}</h2>
    <div class="flex space-x-4">
      <Input type="date" @change="selectStartDate($event.target.value)" />
      <Input type="date" @change="selectEndDate($event.target.value)" />
    </div>
    <Button @click="$emit('next')" class="mt-4">Next</Button>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import { useBookingStore } from '@/store/booking'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

defineEmits(['next'])

const configStore = useConfig()
const bookingStore = useBookingStore()

const dateRangeLabel = computed(() => configStore.config?.copy.dateRangeLabel)

function selectStartDate(date: string) {
  bookingStore.selectDate({ start: date, end: bookingStore.date?.end })
}

function selectEndDate(date: string) {
  bookingStore.selectDate({ start: bookingStore.date?.start, end: date })
}
</script>
