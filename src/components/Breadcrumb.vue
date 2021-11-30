<template>
  <div class="col-sm-6">
    <ol class="breadcrumb float-sm-right">
      <li class="breadcrumb-item">
        <nuxt-link :to="this.$C.URL.HOME">
          {{ $t("text.sideMenu.home") }}
        </nuxt-link>
      </li>
      <li
        v-for="(e, index) in breadcrumbList"
        :key="index"
        class="breadcrumb-item"
      >
        <nuxt-link :to="e.url">
          {{ e.title }}
        </nuxt-link>
      </li>
      <li class="breadcrumb-item">
        {{ current.title }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class Breadcrumb extends Vue {
  @Prop({
    default: {
      url: "",
      title: ""
    }
  })
  current: any;

  @Prop()
  breadcrumbList?: any[];
}
</script>
