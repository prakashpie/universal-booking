<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-2">Select an Item</h2>
    <RadioGroup v-model="selectedItem">
      <div v-for="item in configStore.config.catalog" :key="item.id" class="flex items-center space-x-2 py-2">
        <RadioGroupItem :id="item.id" :value="item" />
        <label :for="item.id">{{ item.name }}</label>
      </div>
    </RadioGroup>

    <div v-if="error" class="text-red-500 mt-4">
      <p>Error loading inventory: {{ error.message }}</p>
    </div>
    <div v-else-if="inventory" class="h-64 overflow-y-auto border rounded-md p-2 mt-4">
      <ul>
        <li
v-for="inventoryItem in inventory.inventory" :key="inventoryItem.date"
            class="p-2 border-b cursor-pointer"
            :class="{ 'bg-gray-200': selectedInventoryItem && selectedInventoryItem.date === inventoryItem.date }"
            @click="selectedInventoryItem = inventoryItem">
          {{ inventoryItem.date }} - Available: {{ inventoryItem.availableCount }}
        </li>
      </ul>
    </div>
    <div v-else-if="selectedItem" class="mt-4">
      <p>Loading inventory...</p>
    </div>

    <div class="mt-4 flex justify-between">
      <Button variant="outline" @click="$emit('back')">Back</Button>
      <Button :disabled="!selectedInventoryItem" @click="handleBooking">Book</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useConfig } from '@/composables/useConfig'
import { useBookingStore } from '@/store/booking'
import { useInventory } from '@/composables/useInventory'
import { useBooking } from '@/composables/useBooking'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

defineEmits(['back'])

const configStore = useConfig()
const bookingStore = useBookingStore()
const { fetchInventory } = useInventory()
const { book } = useBooking()

const inventory = ref(null)
const error = ref(null)
const selectedItem = ref(null)
const selectedInventoryItem = ref(null)

watch(selectedItem, async (newItem) => {
  if (newItem) {
    inventory.value = null
    error.value = null
    selectedInventoryItem.value = null
    try {
      const { data, error: fetchError } = await fetchInventory(
        newItem.id,
        bookingStore.date.start,
        bookingStore.date.end
      )
      if (fetchError.value) {
        throw fetchError.value
      }
      inventory.value = data.value
      bookingStore.selectItem(newItem)
    } catch (e) {
      error.value = e
    }
  }
})

async function handleBooking() {
  if (!selectedInventoryItem.value) {
    return
  }
  const payload = {
    vertical: configStore.config.vertical,
    selection: {
      item: selectedItem.value,
      dates: bookingStore.date,
      inventory: selectedInventoryItem.value
    },
  }
  try {
    const { data } = await book(payload)
    console.log('Booking successful:', data.value)
    const router = useRouter()
    await router.push('/confirmation')
  } catch {
    // TODO show some error
  }
}
</script>
