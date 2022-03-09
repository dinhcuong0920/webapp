<template>
  <div>
    <bar-chart :data="data" :options="options" :height="150" ref="barChart"></bar-chart>
  </div>
</template>


<script>
  import BarChart from '@/components/BarChart'
  export default {
    components: { BarChart },
    props: {
      dataset: {
        type: Object,
        required: true
      },
      labels: {
        type: Array,
        required: true
      },
      maxYLeft: {
        type: Number,
        required: true
      },
      minYLeft: {
        type: Number,
        required: true
      },
      maxYRight: {
        type: Number,
        required: true
      },
      minYRight: {
        type: Number,
        required: true
      },
      title: {
        type: Array,
        required: true
      }
    },
    data(props) {
      return {
        data: {
          datasets: [
            {
              label: 'Khối Lượng',
              data: props.dataset.volumeGrowth,
              fill: false,
              borderColor: 'rgb(171 171 171)',
              tension: 0,
              type: 'line',
              yAxisID: 'A',
              order: 1,
              datalabels: {
                align: 'start',
                // anchor: 'end'
              }
            },
            {
              label: 'Giá',
              data: props.dataset.priceGrowth,
              fill: false,
              borderColor: '#ffc241',
              tension: 0,
              type: 'line',
              yAxisID: 'B',
              order: 1,
              datalabels: {
                align: 'end',
                // anchor: 'end'
              }
            },
          ],
          labels: props.labels
        },
        options: {
          responsive: true,
          legend: {
            display: true
          },
          legendCallback: function (chart) {             
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel
              }
            }
          },
          plugins: {
            datalabels: {
              color: '#333333',
              font: {
                weight: 'bold',
                size: 13,
              },
              display: false,
              formatter: function(value) {
                return value.toFixed(0)
              }
            }
          },
          scales: {
            xAxes: [{
            	barPercentage: 0.5,
              ticks: {
                padding: 15
              }
            }],
            yAxes: [{
              id: 'A',
              type: 'linear',
              position: 'left',
              ticks: {
                max: props.maxYLeft,
                min: props.minYLeft,
                callback: function(label) {
                  return label.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join('.')
                }
              }
            }, {
              id: 'B',
              type: 'linear',
              position: 'right',
              gridLines: {
                display: false
              },
              ticks: {
                max: props.maxYRight,
                min: props.minYRight
              }
            }]
          },
        }
      }
    },
    watch: {
      dataset: {
        handler(newVal) {
          this.data.datasets[0].data = newVal.volumeGrowth
          this.data.datasets[1].data = newVal.priceGrowth
          this.$refs.barChart.update()
        },
        deep: true
      },
      labels: {
        handler(newVal) {
          this.data.labels = newVal,
          this.$refs.barChart.update()
        },
        deep: true
      },
      maxYLeft: {
        handler(newVal) {
          this.options.scales.yAxes[0].ticks.max = newVal
        }
      },
      minYLeft: {
        handler(newVal) {
          this.options.scales.yAxes[0].ticks.min = newVal
        }
      },
      maxYRight: {
        handler(newVal) {
          this.options.scales.yAxes[1].ticks.max = newVal
        }
      },
      minYRight: {
        handler(newVal) {
          this.options.scales.yAxes[1].ticks.min = newVal
        }
      }
    },
    methods: {
    },
  }

</script>
