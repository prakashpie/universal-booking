<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-2">Item Selector</h2>
    <div v-if="error" class="text-red-500">
      <p>Error loading inventory: {{ error.message }}</p>
    </div>
    <div v-else-if="inventory" class="h-64 overflow-y-auto border rounded-md p-2">
      <ul>
        <li v-for="item in inventory.inventory" :key="item.date" class="p-2 border-b">
          {{ item.date }} - Available: {{ item.availableCount }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading inventory...</p>
    </div>
    <div class="mt-4 flex justify-between">
      <Button @click="$emit('back')" variant="outline">Back</Button>
      <Button @click="handleBooking">Book</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import { useBookingStore } from '@/store/booking'
import { useInventory } from '@/composables/useInventory'
import { useBooking } from '@/composables/useBooking'
import { Button } from '@/components/ui/button'

defineEmits(['back'])

const configStore = useConfig()
const bookingStore = useBookingStore()
const { fetchInventory } = useInventory()
const { book } = useBooking()

const inventory = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    const { data, error: fetchError } = await fetchInventory(
      configStore.config.catalog[0].id, // for now, just use the first item
      bookingStore.date.start,
      bookingStore.date.end
    )
    if (fetchError.value) {
      throw fetchError.value
    }
    inventory.value = data.value
  } catch (e) {
    error.value = e
  }
})

async function handleBooking() {
  const payload = {
    vertical: configStore.config.vertical,
    selection: {
      item: configStore.config.catalog[0],
      dates: bookingStore.date,
    },
  }
  const { data } = await book(payload)
  console.log(data.value)
}
</script>
