<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-2">{{ configStore.config?.copy.sessionLabel }}</h2>
    <div v-if="error" class="text-red-500">
      <p>Error loading sessions: {{ error.message }}</p>
    </div>
    <div v-else-if="list" class="h-64 overflow-y-auto border rounded-md p-2">
      <div v-for="{ data } in list" :key="data.id" class="p-2 border-b">
        {{ data.start }} - {{ data.end }}
      </div>
    </div>
    <div v-else>
      <p>Loading sessions...</p>
    </div>
    <Button class="mt-4" @click="handleBooking">{{ configStore.config?.copy.cta }}</Button>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import { useSessions } from '@/composables/useSessions'
import { useBooking } from '@/composables/useBooking'
import { useVirtualList } from '@vueuse/core'
import { Button } from '@/components/ui/button'

const configStore = useConfig()
const { fetchSessions } = useSessions()
const { book } = useBooking()

const sessions = ref(null)
const error = ref(null)

const { list } = useVirtualList(sessions.value?.sessions, {
  itemHeight: 22,
})

onMounted(async () => {
  try {
    const { data, error: fetchError } = await fetchSessions(
      configStore.config.catalog[0].id, // for now, just use the first class
      new Date().toISOString(),
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    )
    if (fetchError.value) {
      throw fetchError.value
    }
    sessions.value = data.value
  } catch (e) {
    error.value = e
  }
})

async function handleBooking() {
  const payload = {
    vertical: configStore.config.vertical,
    selection: {
      session: sessions.value.sessions[0], // for now, just book the first available session
    },
  }
  const { data } = await book(payload)
  console.log(data.value)
}
</script>
