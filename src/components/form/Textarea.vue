<template>
  <div class="row">
    <div class="col-12">
      <textarea v-model="value" class="form-control" :rows="rows"></textarea>
      <div class="text-right">
        <span :class="{ 'text-danger': maxlength < inputLength }">{{
          inputLength
        }}</span>
        /{{ maxlength }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import _ from "lodash";

@Component
export default class Textarea extends Vue {
  @PropSync("inputvalue")
  value!: string;

  @Prop({ default: 3 })
  rows!: number;

  @Prop({ default: 500 })
  maxlength!: number;

  @Prop()
  classObject?: any;

  get dataClassObject(): any {
    const defaultClassObject = {
      btnColor: ""
    };
    return _.defaults(this.classObject, defaultClassObject);
  }

  get inputLength(): number {
    return this.value.length;
  }
}
</script>
