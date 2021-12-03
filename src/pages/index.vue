<template>
   <section>
      <div class="entry-header">
        <h1 class="entry-title">HOME</h1>
      </div>
      <div class="entry-content">
        <p>すべての投稿を一覧表示しています。</p>
        <div class="box-list"></div>
      </div>
    </section>
</template>

<script lang="ts">
import { ArrowNarrowRightIcon } from '@heroicons/vue/outline'

interface links {
    id: number
    title: string
    url: any
}

export default {
    components: {
        ArrowNarrowRightIcon
    },
    setup() {
        const router = useRouter()
        const lists = ref<links[]>([
            { id: 1, title: 'Pinia Store', url: 'pinia' },
            { id: 1, title: 'Modal', url: 'modal' },
             { id: 1, title: 'Menu', url: 'menu' },
            { id: 1, title: 'New soon...', url: '' },
        ])
        return {
            lists
        }
    }
}
</script>