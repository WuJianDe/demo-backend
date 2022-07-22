import { defineComponent, h,PropType } from 'vue'

import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Tooltip,
  ArcElement,
  CategoryScale,
  ChartData,
  DefaultDataPoint
} from 'chart.js'

ChartJS.register(Tooltip,ArcElement, CategoryScale)

export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    chartData: {
      type: Object as PropType<
        ChartData<'doughnut', DefaultDataPoint<'doughnut'>, unknown>
      >,
      required: true
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
      h(Doughnut, {
        chartData: props.chartData,
        chartOptions,
        width: props.width,
        height: props.height,
      })
  }
})
