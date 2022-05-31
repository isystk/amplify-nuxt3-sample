<template>
  <v-footer class="d-flex flex-column" color="primary">
    <div>
      <v-btn
        v-for="(item, index) in items"
        :key="index"
        class="mx-4 text-white"
        :icon="item.icon"
        variant="text"
        @click="locate(item)"
      />
    </div>

    <div class="text-white pt-0">© 2020 isystk&apos;s sample</div>
  </v-footer>
</template>

<script setup lang="ts">
import MainService from '@/services/main'
const props = defineProps<{
  store: MainService
}>()
const items = [
  { icon: 'mdi-facebook', link: 'https://www.facebook.com/ise0615/' },
  { icon: 'mdi-twitter', link: 'https://twitter.com/ise0615/' },
  { icon: 'mdi-instagram', link: 'https://www.instagram.com/isystk/' },
  { icon: 'mdi-github', link: 'https://github.com/isystk/' },
]
const locate = (item) => {
  location.href = item.link
}
</script>
