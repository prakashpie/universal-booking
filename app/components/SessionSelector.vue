<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-2">{{ configStore.config?.copy.sessionLabel }}</h2>
    <div v-if="error" class="text-red-500">
      <p>Error loading sessions: {{ error.message }}</p>
    </div>
    <div v-else-if="list && list.length > 0" class="h-64 overflow-y-auto border rounded-md p-2">
      <div v-for="{ data } in list" :key="data.id"
           class="p-2 border-b cursor-pointer"
           :class="{ 'bg-gray-200': selectedSession && selectedSession.id === data.id }"
           @click="selectedSession = data">
        {{ data.start }} - {{ data.end }}
      </div>
    </div>
    <div v-else-if="!error">
      <p>No sessions available for the selected criteria.</p>
    </div>
    <div v-else>
      <p>Loading sessions...</p>
    </div>
    <Button class="mt-4" :disabled="!selectedSession" @click="handleBooking">{{ configStore.config?.copy.cta }}</Button>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import { useSessions } from '@/composables/useSessions'
import { useBooking } from '@/composables/useBooking'
import { useBookingStore } from '@/store/booking'
import { useVirtualList } from '@vueuse/core'
import { Button } from '@/components/ui/button'

const configStore = useConfig()
const bookingStore = useBookingStore()
const { fetchSessions } = useSessions()
const { book } = useBooking()

const sessions = ref(null)
const error = ref(null)
const selectedSession = ref(null)

const { list } = useVirtualList(sessions, {
  itemHeight: 22,
})

onMounted(async () => {
  try {
    const { data, error: fetchError } = await fetchSessions(
      bookingStore.service.id,
      bookingStore.date.start,
      bookingStore.date.end
    )
    if (fetchError.value) {
      throw fetchError.value
    }
    sessions.value = data.value.sessions
  } catch (e) {
    error.value = e
  }
})

async function handleBooking() {
  if (!selectedSession.value) {
    return
  }
  bookingStore.selectSession(selectedSession.value)
  const payload = {
    vertical: configStore.config.vertical,
    selection: {
      session: selectedSession.value,
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
