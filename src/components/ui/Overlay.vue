<template>
  <div>
    <div
      v-if="isVisible"
      id="overlay-background"
      @click.prevent="close()"
    ></div>
    <div class="isystk-overlay" :class="{ open: isVisible }">
      <a href="#" class="close" @click.prevent="close()">
        <i class="far fa-times-circle"></i>
      </a>
      <div class="wrap">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";

@Component({
  layout: "loginLayout"
})
export default class Overlay extends Vue {
  // 表示するかどうか
  @PropSync("isVisibleOverlay", {
    type: Boolean,
    default: false
  })
  isVisible;

  // オーバーレイを閉じます
  close(): void {
    this.isVisible = false;
  }
}
</script>

<style lang="scss" scoped>
#overlay-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0e0e0e;
  opacity: 0.5;
  z-index: 10000;
}
.isystk-overlay {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  max-width: 1200px;
  z-index: 10001;
  background: #fff;
  opacity: 0;
  visibility: hidden;
  transition: 0.1s linear;
}
.isystk-overlay .wrap {
  background-color: #fff;
  padding: 10px;
}
.isystk-overlay.open {
  opacity: 1;
  visibility: visible;
  animation: open-animation 0.5s ease 0s 1 forwards;
}
@keyframes open-animation {
  0% {
    transform: scaleY(0.1) scaleX(0.1);
  }
  50% {
    transform: scaleY(1) scaleX(0.1);
  }
  100% {
    transform: scaleY(1) scaleX(1);
  }
}
.isystk-overlay .title {
  margin-bottom: 5px;
  padding: 5px;
  border-bottom: solid 1px #ccc;
  font-size: 20px;
}
.isystk-overlay td {
  padding: 10px;
}
.isystk-overlay .close {
  position: absolute;
  right: 0;
  margin: 5px;
  zoom: 100%;
  color: #333;
}
</style>
