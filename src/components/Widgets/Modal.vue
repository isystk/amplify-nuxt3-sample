<template>
  <v-dialog v-model="_isOpen">
    <v-card>
      <v-card-title class="card-header">
        {{ title }}
        <v-spacer />
        <v-btn icon @click="handleClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  title: string
  isOpen: boolean
  handleClose: () => void
}>()
const _isOpen = computed(() => {
  return props.isOpen
})
</script>
