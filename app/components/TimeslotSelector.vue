<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-2">{{ timeLabel }}</h2>
    <div v-if="error" class="text-red-500">
      <p>Error loading availability: {{ error.message }}</p>
    </div>
    <RadioGroup v-else-if="availability && availability.slots" v-model="selectedSlot">
      <div class="h-64 overflow-y-auto border rounded-md p-2">
        <div v-for="slot in availability.slots" :key="slot.start" class="flex items-center mb-2 p-2 border-b">
          <RadioGroupItem :id="slot.start" :value="slot" />
          <label :for="slot.start" class="ml-2">{{ formatSlot(slot) }}</label>
        </div>
      </div>
    </RadioGroup>
    <div v-else>
      <p>Loading availability...</p>
    </div>
    <div class="mt-4 flex justify-between">
      <Button variant="outline" @click="$emit('back')">Back</Button>
      <Button :disabled="!selectedSlot" @click="handleBooking">{{ configStore.config?.copy.cta }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import { useBookingStore } from '@/store/booking'
import { useAvailability } from '@/composables/useAvailability'
import { useBooking } from '@/composables/useBooking'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

defineEmits(['back'])

const configStore = useConfig()
const bookingStore = useBookingStore()
const { fetchAvailability } = useAvailability()
const { book } = useBooking()

const timeLabel = computed(() => configStore.config?.copy.timeLabel)
const availability = ref(null)
const error = ref(null)
const selectedSlot = ref(null)

const formatSlot = (slot: { start: string, end: string }) => {
  const startDate = new Date(slot.start)
  const endDate = new Date(slot.end)
  const day = startDate.toLocaleDateString([], { weekday: 'short' })
  const startTime = startDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
  const endTime = endDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
  return `${day}, ${startTime} - ${endTime}`
}

onMounted(async () => {
  try {
    const { data, error: fetchError } = await fetchAvailability(
      bookingStore.service.id,
      bookingStore.provider.id,
      new Date().toISOString(),
      new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    )
    if (fetchError.value) {
      throw fetchError.value
    }
    availability.value = data.value
  } catch (e) {
    error.value = e
  }
})

async function handleBooking() {
  if (!selectedSlot.value) return

  const payload = {
    vertical: configStore.config.vertical,
    selection: {
      service: bookingStore.service,
      provider: bookingStore.provider,
      slot: selectedSlot.value,
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
