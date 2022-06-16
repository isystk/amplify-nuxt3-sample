<template>
  <div>
    <v-app-bar class="overflow-visible" color="primary" prominent>
      <pages-logo />
      <v-spacer />

      <template v-if="state.isLogined">
        <v-card
          class="mx-auto top-0 right-0 invisible md:visible"
          width="300"
          absolute
        >
          <v-list density="compact" theme="dark" nav>
            <v-list-group>
              <template #activator="{ props }">
                <v-list-item
                  v-bind="props"
                  two-line
                  prepend-avatar="/images/user_dummy.png"
                  :title="state.name"
                  subtitle="Logged in"
                />
              </template>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :value="item.text"
                :title="item.text"
                :prepend-icon="item.icon"
                @click="item.func"
              />
            </v-list-group>
          </v-list>
        </v-card>
      </template>
      <template v-else>
        <NuxtLink :to="Url.LOGIN" class="invisible md:visible">
          ログイン
        </NuxtLink>
      </template>

      <v-app-bar-nav-icon
        variant="text"
        class="visible md:invisible"
        @click.stop="toggleMenu"
      />
    </v-app-bar>

    <v-navigation-drawer
      v-model="state.drawer"
      bottom
      temporary
      position="right"
    >
      <v-list>
        <v-list-item
          prepend-avatar="/images/user_dummy.png"
          :title="state.name"
          subtitle="Logged in"
        />
      </v-list>
      <v-divider />
      <v-list density="compact">
        <v-list-subheader>Menu</v-list-subheader>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          active-color="primary"
          @click="item.func"
        >
          <v-list-item-avatar start>
            <v-icon :icon="item.icon" />
          </v-list-item-avatar>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useRouter } from 'nuxt/app' // TODO StorybookでRouterがえらーいなるので追加
import { Url } from '@/constants/url'
import MainService from '@/services/main'
const props = defineProps<{
  store: MainService
}>()
const state = reactive({
  name: '',
  isLogined: false,
  drawer: false,
})

const router = useRouter()

watch(props.store, () => {
  if (!props.store) {
    return
  }
  state.name = props.store.auth.name
  state.isLogined = props.store.auth.isAuthenticated()
})

const toggleMenu = () => {
  state.drawer = !state.drawer
}

const items = computed(() => {
  return [
    state.isLogined
      ? {
          text: 'ログアウト',
          icon: 'mdi-login-variant',
          func: async () => {
            const result = await props.store?.auth.signOut()
            if (result) {
              await router.push(Url.LOGIN)
            }
          },
        }
      : {
          text: 'ログイン',
          icon: 'mdi-login-variant',
          func: () => router.push(Url.LOGIN),
        },
    {
      text: 'マイページ',
      icon: 'mdi-account',
      func: () => router.push(Url.MEMBER),
    },
  ]
})
</script>
