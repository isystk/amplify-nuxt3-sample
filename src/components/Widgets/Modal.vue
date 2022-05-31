<template>
  <v-dialog v-model="_isOpen">
    <v-container>
      <v-card class="md:max-w-lg">
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer />
          <v-btn icon dark @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <slot />
        </v-card-text>
      </v-card>
    </v-container>
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
