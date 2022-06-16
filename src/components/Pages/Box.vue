<template>
  <div>
    <v-breadcrumbs :items="items">
      <template #text="{ item }">
        {{ item.text }}
      </template>
    </v-breadcrumbs>
    <v-container :fluid="fluid">
      <v-card class="mx-auto">
        <v-card-title class="mb-3 card-header">
          {{ items[items.length - 1].text }}
        </v-card-title>
        <v-card-text>
          <slot />
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { Url } from '@/constants/url'
import { computed } from 'vue'
type Breadcrumb = {
  text: string
  disabled?: boolean
  href?: string
}
type Props = {
  breadcrumbs: Breadcrumb[]
  small: boolean
}
const { breadcrumbs, small } = withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
  small: false,
})
const items = computed(() => {
  return [
    {
      text: 'TOP',
      disabled: false,
      href: Url.TOP,
    },
    ...breadcrumbs,
  ]
})
const fluid = computed(() => (small ? false : 'fluid'))
</script>
