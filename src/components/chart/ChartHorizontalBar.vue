<script lang="ts">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import Chart from "chart.js";
import { HorizontalBar, mixins } from "vue-chartjs";

@Component({})
export default class ChartHorizontalBar extends Mixins(
  HorizontalBar,
  mixins.reactiveProp
) {
  @Prop()
  chartData;

  @Prop()
  options;

  mounted(): void {
    if (this.chartData) {
      this.renderChart(this.chartData, this.options);
    }
  }

  @Watch("chartData")
  onChangeData(val, old): void {
    if (this.chartData) {
      this.renderChart(this.chartData, this.options);
    }
  }
}
</script>
