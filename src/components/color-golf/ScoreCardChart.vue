<script>
import { Bar } from 'vue-chartjs';

export default {
  name: 'ScoreCardChart',
  extends: Bar,
  props: {
    test: Number,
  },
  mounted() {
    // this.renderChart(data, options);
  },
};
</script>
