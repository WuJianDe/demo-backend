import { defineComponent, h } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Tooltip, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  components: {
    Bar
  },
  props: {
    chartData: {
      type: Object,
      default: {}
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
  },
  setup(props) {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    }
    return () =>
      h(Bar, {
        chartData: props.chartData,
        chartOptions,
        width: props.width,
        height: props.height,
      })
  }
})
