import { defineComponent, h } from 'vue'

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

export default defineComponent({
  name: 'LineChart',
  components: {
    Line
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
      maintainAspectRatio: false
    }

    return () =>
      h(Line, {
        chartData: props.chartData,
        chartOptions,
        width: props.width,
        height: props.height,
      })
  }
})
