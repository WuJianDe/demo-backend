import { defineComponent, reactive, h } from 'vue'
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
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    labels: {
      type: Array,
      default: []
    },
    data: {
      type: Array,
      default: []
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
        chartData: {
          labels: props.labels,
          datasets: [{
            backgroundColor: '#f87979',
            data: props.data
          }]
        },
        chartOptions,
        width: props.width,
        height: props.height,
      })
  }
})
