<template>
  <div class="p-4">
    <RadioGroup :model-value="bookingStore.provider" @update:model-value="selectProvider">
      <legend class="text-lg font-semibold mb-2">{{ configStore.config?.copy.providersLabel }}</legend>
      <div v-if="providers.length > 0" class="h-64 overflow-y-auto border rounded-md p-2">
        <div v-for="item in providers" :key="item.id" class="flex items-center mb-2">
          <RadioGroupItem :id="item.id" :value="item" />
          <label :for="item.id" class="ml-2 block text-sm text-text">{{ item.name }}</label>
        </div>
      </div>
    </RadioGroup>
    <div class="mt-4 flex justify-between">
      <Button variant="outline" @click="$emit('back')">Back</Button>
      <Button @click="$emit('next')">Next</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'
import { useBookingStore } from '@/store/booking'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import {computed} from "vue";

defineEmits(['next', 'back'])

const configStore = useConfig()
const bookingStore = useBookingStore()

const providers = computed(() => configStore.config?.resources || [])

function selectProvider(provider: any) {
  bookingStore.selectProvider(provider)
}
</script>
