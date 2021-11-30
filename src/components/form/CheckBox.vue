<template>
  <div class="form-group clearfix">
    <div
      v-for="(e, index) in items"
      :key="index"
      class="custom-control custom-checkbox"
    >
      <input
        :id="'checkbox' + e.code"
        v-model="codes"
        type="checkbox"
        :value="e.code"
        class="custom-control-input"
      />
      <label :for="'checkbox' + e.code" class="custom-control-label">
        {{ e.value }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import _ from "lodash";
import { ICheckBox } from "@/interfaces/api/Form/ICheckBox";

@Component
export default class CheckBox extends Vue {
  @PropSync("selectedCode")
  codes!: string[];

  @Prop()
  items!: ICheckBox<string>[];

  @Prop()
  classObject?: {};

  get dataClassObject(): any {
    const defaultClassObject = {
      btnColor: "icheck-primary"
    };
    return _.defaults(this.classObject, defaultClassObject);
  }
}
</script>
