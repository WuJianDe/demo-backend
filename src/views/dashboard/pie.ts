import { defineComponent, h } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Tooltip,
  ArcElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(Tooltip, ArcElement, CategoryScale)

export default defineComponent({
  components: {
    Pie
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
      h(Pie, {
        chartData: props.chartData,
        chartOptions,
        width: props.width,
        height: props.height,
      })
  }
})
