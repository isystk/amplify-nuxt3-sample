<template>
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>{{ current.title }}</h1>
        </div>
        <Breadcrumb :current="current" :breadcrumb-list="breadcrumbList" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Breadcrumb from "@/components/Breadcrumb.vue";

@Component({
  components: {
    Breadcrumb
  }
})
export default class ContentHeader extends Vue {
  head(): any {
    return {
      title: this.current.title
    };
  }

  @Prop({
    default: {
      url: "",
      title: ""
    }
  })
  current!: any;

  @Prop()
  breadcrumbList?: any[];
}
</script>
