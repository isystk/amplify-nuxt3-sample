<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn dropdown-toggle"
      :class="[dataClassObject.btnColor]"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {{ value }}
    </button>
    <div
      :class="{ 'dropdown-menu-right': dataClassObject.isMenuRight }"
      class="dropdown-menu"
      style="max-height: 300px; overflow: scroll;"
    >
      <a
        v-for="(e, index) in values"
        :key="index"
        class="dropdown-item text-muted"
        href="#"
        @click.prevent="select(index)"
      >
        {{ e.value }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import _ from "lodash";
import { ISelectBox } from "@/interfaces/api/Form/ISelectBox";

@Component
export default class SelectBox extends Vue {
  @PropSync("selectedCode", { type: String, default: "" })
  code!: string;

  @Prop()
  values!: ISelectBox<string>[];

  @Prop()
  classObject?: {};

  value = "-----";

  get dataClassObject(): any {
    const defaultClassObject = {
      isMenuRight: false,
      btnColor: "btn-default"
    };
    return _.defaults(this.classObject, defaultClassObject);
  }

  select(index: number): void {
    this.code = this.values[index].code;
    this.value = this.values[index].value;
  }

  // 親のコンポーネントでcodeが変更された場合に同期したい場合
  @Watch("code", { immediate: true })
  onChangeCode(code: string): void {
    if (!code) {
      return;
    }
    this.value = _.filter(this.values, { code })[0].value;
  }
}
</script>
