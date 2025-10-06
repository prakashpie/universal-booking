<template>
  <div>
    <div v-if="config">
      <component :is="steps[currentStep]" @next="nextStep" @back="prevStep" />
    </div>
    <div v-else-if="error">
      <p>Error loading config: {{ error.message }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import { useTheme } from '@/composables/useTheme'
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  vertical: {
    type: String,
    required: true,
  },
})

const configStore = useConfig()
const { applyTheme } = useTheme()
const config = computed(() => configStore.config)
const error = ref(null)

const steps = shallowRef({
  service: defineAsyncComponent(() => import('./ServiceSelector.vue')),
  provider: defineAsyncComponent(() => import('./ProviderSelector.vue')),
  timeslot: defineAsyncComponent(() => import('./TimeslotSelector.vue')),
  session: defineAsyncComponent(() => import('./SessionSelector.vue')),
  dateRange: defineAsyncComponent(() => import('./DateRangeSelector.vue')),
  item: defineAsyncComponent(() => import('./ItemSelector.vue')),
})

const currentStepIndex = ref(0)
const currentStep = computed(() => config.value?.layout.flow[currentStepIndex.value])

async function fetchConfig(vertical: string) {
  error.value = null
  try {
    await configStore.fetchConfig(vertical)
    applyTheme()
  } catch (e) {
    error.value = e
  }
}

function nextStep() {
  if (currentStepIndex.value < config.value.layout.flow.length - 1) {
    currentStepIndex.value++
  }
}

function prevStep() {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}

watch(() => props.vertical, async (newVertical) => {
  currentStepIndex.value = 0
  await fetchConfig(newVertical)
})

await fetchConfig(props.vertical)
</script>
