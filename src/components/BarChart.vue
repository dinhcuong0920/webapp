<script>
import { Bar } from 'vue-chartjs'
import ChartDataLabels  from "chartjs-plugin-datalabels";

export default {
  extends: Bar,
  props: ['data', 'options'],
  methods: {
    update() {
      this.$data._chart.update()
    }
  },
  watch: {
    options: {
      handler() {
        this.renderChart(this.data, this.options)
      },
      deep: true
    }
  },
  mounted() {
    this.addPlugin(ChartDataLabels)
    this.renderChart(this.data, this.options)
  },
}
</script>
