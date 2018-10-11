
<script>
import VueCharts from 'vue-chartjs';
import { Pie } from 'vue-chartjs';
import { getCommaNumber } from '~/utils';

export default {
  extends: Pie,
  props: ['data', 'labels'],
  mounted() {
    const data = {
      labels: this.labels,
      datasets: [
        {
          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
          data: this.data,
        },
        {},
      ],
    };
    const options = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            const { datasetIndex, index } = tooltipItem;
            const label = data.labels[index];
            const value = data.datasets[datasetIndex].data[index];
            return `${label}: ${getCommaNumber(value)}`;
          },
        },
      },
    };

    this.renderChart(data, options);
  },
};
</script>
