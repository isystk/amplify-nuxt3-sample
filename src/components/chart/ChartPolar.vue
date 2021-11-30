<script lang="ts">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import Chart from "chart.js";
import { PolarArea, mixins } from "vue-chartjs";

@Component({})
export default class ChartPolar extends Mixins(PolarArea, mixins.reactiveProp) {
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
