<template>
  <div>
    <!-- カレンダーヘッダ -->
    <div id="cal-header">
      <a href="#" class="header-arrow" @click.prevent="setLastMonth">＜</a>
      <span class="selected-month">{{ year }}年{{ month }}月</span>
      <a href="#" class="header-arrow" @click.prevent="setNextMonth">＞</a>
    </div>

    <!-- カレンダーメイン -->
    <div>
      <table id="cal-main">
        <!-- 曜日を表示させる（テーブルヘッダ） -->
        <thead>
          <th v-for="(dayname, index) in weekdays" :key="index">
            {{ dayname }}
          </th>
        </thead>
        <!-- 日付を表示させる（テーブルボディ） -->
        <tbody>
          <tr v-for="(weekData, index) in calData" :key="index">
            <td
              v-for="(dayNum, index2) in weekData"
              :key="index2"
              class="cal-day"
              :class="{ 'cal-today': isToday(dayNum), active: day === dayNum }"
              @click.prevent="dateClick(dayNum)"
            >
              <a v-if="isToday(dayNum)" href="#">
                {{ dayNum }}
              </a>
              <a v-else href="#">
                {{ dayNum }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import _ from "lodash";

@Component
export default class Calendar extends Vue {
  weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  year = 2020;
  month = 3;
  day = -1;
  today = "";

  @PropSync("selectedDate", {
    type: Date,
    default: null
  })
  date;

  /**
   * 先月のカレンダーを取得
   */
  setLastMonth(): void {
    if (this.month === 1) {
      this.year--;
      this.month = 12;
    } else {
      this.month--;
    }
    this.day = -1;
  }

  /**
   * 翌月のカレンダーを取得
   */
  setNextMonth(): void {
    if (this.month === 12) {
      this.year++;
      this.month = 1;
    } else {
      this.month++;
    }
    this.day = -1;
  }

  /**
   * カレンダー日付クリック時の処理
   */
  dateClick(dayNum): void {
    if (dayNum !== "") {
      this.day = dayNum;
    }
    this.date = new Date(this.year, this.month, this.day);
  }

  /**
   * 今日かどうかの判定
   * 年、月は現在選択しているページ
   * 日は引数
   */
  isToday(day): boolean {
    const date = _.concat(
      this.year,
      "-",
      ("00" + this.month).slice(-2),
      "-",
      day
    ).join("");
    if (this.today === date) {
      return true;
    }
    return false;
  }

  get calData(): string[][] {
    const calDatas: string[][] = [];

    // 初日の曜日を取得
    const firstWeekDay = new Date(this.year, this.month - 1, 1).getDay();

    // 月の日数
    const lastDay = new Date(this.year, this.month, 0).getDate();

    // 日数カウント用
    let dayNum = 1;

    // 週ごとのデータを作成して、calDateにpush
    while (dayNum <= lastDay) {
      const weekData: string[] = [];

      // 日曜～土曜の日付データを配列で作成
      for (let i = 0; i <= 6; i++) {
        if (calDatas.length === 0 && i < firstWeekDay) {
          // 初週の1日以前の曜日は空文字
          weekData[i] = "";
        } else if (lastDay < dayNum) {
          // 最終日以降の曜日は空文字
          weekData[i] = "";
        } else {
          // 通常の日付入力
          weekData[i] = dayNum + "";
          dayNum++;
        }
      }
      calDatas.push(weekData);
    }
    return calDatas;
  }

  mounted(): void {
    const date = new Date();
    const y = date.getFullYear();
    const m = ("0" + (date.getMonth() + 1)).slice(-2);
    const d = ("0" + date.getDate()).slice(-2);

    // yearとmonthを設定
    this.year = y;
    this.month = Number(m);

    // 今日の日付を設定
    this.today = y + "-" + m + "-" + d;
  }
}
</script>

<style lang="scss" scoped>
/*---------------------------------------
ヘッダのcss
---------------------------------------*/
#cal-header {
  font-size: 14px;
  padding: 0;
  text-align: center;
  margin-bottom: 10px;
  background-color: darkorange;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}
#cal-header span,
#cal-header a {
  padding: 5px 20px;
  color: white;
  display: inline-block;
}
/*---------------------------------------
カレンダーのcss
---------------------------------------*/
#cal-main {
  font-size: 14px;
  line-height: 20px;
  table-layout: fixed;
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-bottom: 1px solid #ddd;
  border-collapse: collapse;
}
#cal-main th {
  padding: 0;
  text-align: center;
  vertical-align: middle;
  font-weight: normal;
  color: #999;
}
#cal-main td {
  padding: 8px;
  text-align: center;
  vertical-align: middle;
  border-top: 1px solid #ddd;
}
#cal-main td a {
  color: #212529;
}
.cal-today {
  background-color: #fcf8e3;
}
.cal-day.active {
  background-color: #ffc9d7;
}
</style>
