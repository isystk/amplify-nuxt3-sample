<template>
  <div>
    <div
      class="box"
      @mousedown.prevent="onTouchStart"
      @touchstart.prevent="onTouchStart"
    >
      <div
        class="list"
        :style="[_listStyle, imageSize]"
        @transitionend="onTransitionEnd"
      >
        <!-- 後ろの要素をコピー -->
        <template v-for="(e, index) in COPY_COUNT">
          <div
            v-if="isCarousel"
            :key="'before' + index"
            class="list__item"
            :style="[imageSize]"
          >
            <div class="item square">
              <img :src="imagePath[imagePath.length - (COPY_COUNT - index)]" />
            </div>
          </div>
        </template>
        <!-- 本体 -->
        <template v-for="(e, index) in imagePath">
          <div :key="index" class="list__item" :style="[imageSize]">
            <div class="item square">
              <img :src="e" />
            </div>
          </div>
        </template>
        <!-- 最初の要素をコピー -->
        <template v-for="(e, index) in COPY_COUNT">
          <div
            v-if="isCarousel"
            :key="'after' + index"
            class="list__item"
            :style="[imageSize]"
          >
            <div class="item square">
              <img :src="imagePath[index]" />
            </div>
          </div>
        </template>
      </div>
    </div>
    <ul class="paging dot">
      <template v-for="e in maxPageNo">
        <li
          :key="e"
          :class="currentPageNo == e ? 'active' : ''"
          @click.prevent="changePage(e)"
        ></li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";

@Component
export default class ImageCarousel extends Vue {
  // 表示する画像のパス
  @Prop({
    type: Array as PropType<string[]>,
    default: () => [],
    required: true
  })
  imagePath;

  // カルーセルするかどうか
  @Prop({ type: Boolean, default: false, required: false })
  isCarousel;

  // 自動でページングさせるかどうか
  @Prop({ type: Boolean, default: false, required: false })
  isAutoPager;

  // 画像表示のサイズ指定
  @Prop({
    type: Object as PropType<string>,
    default: () => ({ width: "200px", height: "200px" }),
    required: true
  })
  imageSize;

  // 1ページでスライドさせる子要素の数
  @Prop({ type: Number, default: 1, required: false })
  shift;

  // 初期表示するページNo
  @Prop({ type: Number, default: 1, required: false })
  pageNo;

  // 表示中のページNo
  currentPageNo = this.pageNo;

  // 最大ページ数
  get maxPageNo(): number {
    return this.imagePath.length / this.shift;
  }

  private currentNum = 0;
  private diffX = 0;
  private startX: number | null = null;
  private COPY_COUNT = this.shift * 2; // コピーする数
  private isAnimating = false;

  // 1ページでスライドさせる子要素の数に応じて初期表示位置をシフトする
  get startShift(): number {
    return Math.floor(this.shift / 2);
  }

  mounted(): void {
    // PC向け
    window.addEventListener("mousemove", this.onTouchMove);
    window.addEventListener("mouseup", this.onTouchUp);
    // スマホ向け
    window.addEventListener("touchmove", this.onTouchMove);
    window.addEventListener("touchend", this.onTouchUp);

    // 初期ページを設定
    this.changePage(this.pageNo);

    // 自動でページングさせる
    if (this.isAutoPager) {
      this.startTimer();
    }
  }

  beforeDestroy(): void {
    // PC向け
    window.removeEventListener("mousemove", this.onTouchMove);
    window.removeEventListener("mouseup", this.onTouchUp);
    // スマホ向け
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("touchend", this.onTouchUp);
  }

  // スライドアニメーション
  get _listStyle(): any {
    if (this.isCarousel) {
      return {
        transition: this.isAnimating ? "" : "none",
        transform: `translate3d(${-100 *
          (this.startShift +
            this.currentNum +
            this.COPY_COUNT)}%, 0, 0) translate3d(${this.diffX}px, 0, 0)`
      };
    } else {
      return {
        transition: this.startX == null ? "" : "none",
        transform: `translate3d(${-100 *
          (this.startShift + this.currentNum)}%, 0, 0) translate3d(${
          this.diffX
        }px, 0, 0)`
      };
    }
  }

  onTouchStart(e): void {
    if (e.touches && e.touches[0]) {
      this.startX = e.touches[0].clientX;
    } else if (e.originalEvent && e.originalEvent.changedTouches[0]) {
      this.startX = e.originalEvent.changedTouches[0].clientX;
    } else if (e.clientX) {
      this.startX = e.clientX;
    }
  }

  onTouchMove(e): void {
    if (this.startX == null) {
      return;
    }
    if (e.touches && e.touches[0]) {
      this.diffX = e.touches[0].clientX - this.startX;
    } else if (e.originalEvent && e.originalEvent.changedTouches[0]) {
      this.diffX = e.originalEvent.changedTouches[0].clientX - this.startX;
    } else if (e.clientX) {
      this.diffX = e.clientX - this.startX;
    }
  }

  onTouchUp(e): void {
    this.startX = null;
    if (this.diffX > 20) {
      if (this.isCarousel) {
        this.currentNum -= this.shift;
        this.isAnimating = true;
      } else {
        this.currentNum = Math.max(this.currentNum - this.shift, 0);
      }
      // ページ番号を設定
      if (this.currentPageNo > 1) {
        this.currentPageNo -= 1;
      } else if (this.isCarousel) {
        this.currentPageNo = this.maxPageNo;
      }
    }
    if (this.diffX < -20) {
      if (this.isCarousel) {
        this.currentNum += this.shift;
        this.isAnimating = true;
      } else {
        this.currentNum = Math.min(
          this.currentNum + this.shift,
          this.imagePath.length - this.shift
        );
      }
      // ページ番号を設定
      if (this.currentPageNo < this.maxPageNo) {
        this.currentPageNo += 1;
      } else if (this.isCarousel) {
        this.currentPageNo = 1;
      }
    }
    this.diffX = 0;
  }

  onTransitionEnd(): void {
    this.adjustPosition();
  }

  adjustPosition(): void {
    this.isAnimating = false;
    this.currentNum =
      (this.currentNum + this.imagePath.length) % this.imagePath.length;
  }

  // 引数で指定したページ番号を表示する
  changePage(num: number): void {
    this.isAnimating = true;
    this.currentNum = this.shift * (num - 1);
    this.currentPageNo = num;
  }

  // 自動でページングさせる
  startTimer(): void {
    const timer = window.setTimeout(() => {
      clearInterval(timer);
      let showPageNo = this.currentPageNo + 1;
      if (showPageNo > this.maxPageNo) {
        showPageNo = 1;
      }
      this.changePage(showPageNo);
      this.startTimer();
    }, 5000);
  }
}
</script>

<style lang="scss" scoped>
.box {
  border: solid 2px #ccc;
  overflow: hidden;
}

.list {
  width: 200px;
  margin: 0 auto;
  white-space: nowrap;
  font-size: 0;
  transition: transform 0.5s;

  &__item {
    display: inline-block;
    padding: 10px;
    width: 100%;
    height: 200px;
    font-size: 16px;
  }
}

.item {
  width: 100%;
  height: 100%;
  border: solid 1px #000;
  user-select: none;

  &--copy {
    background-color: #f0f0ff;
  }
}

.square {
  width: 100%;
  position: relative;
}
.square img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  object-fit: cover;
}

.paging {
  display: flex;
  justify-content: space-around;
  padding: 0;
}
.paging.dot {
  width: 50%;
  margin: 5px auto;
}
.paging.dot li {
  border: 1px solid #666;
  border-radius: 50%;
  width: 7px;
  height: 7px;
  list-style-type: none;
}
.paging.dot li.active {
  background: #666;
}
</style>
