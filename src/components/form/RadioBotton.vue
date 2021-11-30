<template>
  <div class="form-group clearfix">
    <div
      v-for="(e, index) in items"
      :key="index"
      class="custom-control custom-radio"
    >
      <input
        :id="'radio' + e.code"
        v-model="codes"
        type="radio"
        :value="e.code"
        class="custom-control-input"
      />
      <label :for="'radio' + e.code" class="custom-control-label">
        {{ e.value }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import _ from "lodash";
import { IRadioBotton } from "@/interfaces/api/Form/IRadioBotton";

@Component
export default class RadioBotton extends Vue {
  @PropSync("selectedCode")
  codes!: string[];

  @Prop()
  items!: IRadioBotton<string>[];

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
