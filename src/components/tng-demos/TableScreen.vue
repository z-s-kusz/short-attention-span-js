<template>
<section class="container">
  <table>
    <tbody>
      <tr>
        <td>7851</td>
        <td>3900275</td>
        <td>2400</td>
        <td>46771</td>
        <td>7862</td>
        <td>1029</td>
        <td>11101</td>
        <td>89</td>
        <td class="table-button">
        </td>
        <td class="table-button">
          <tng-block-button :color="'portage'" :roundSides="'right'">1 9767</tng-block-button>
        </td>
      </tr>
      <tr class="tng-text-red">
        <td>7812</td>
        <td>8784312</td>
        <td>18</td>
        <td>591</td>
        <td>3681</td>
        <td>71</td>
        <td>01001</td>
        <td>54</td>
        <td class="table-button">
          <tng-block-button :color="'steel-blue'">90 245</tng-block-button>
        </td>
        <td class="table-button">
          <tng-block-button :roundSides="'right'">15 112</tng-block-button>
        </td>
      </tr>
      <tr class="tng-text-red">
        <td>781</td>
        <td>450</td>
        <td>70</td>
        <td>771</td>
        <td>361</td>
        <td>1029</td>
        <td>11011</td>
        <td>35</td>
        <td class="table-button">
        </td>
        <td class="table-button">
          <tng-block-button :color="'plum'" :roundSides="'right'">8 673</tng-block-button>
        </td>
      </tr>
      <tr>
        <td>7804</td>
        <td>11029385</td>
        <td>5612</td>
        <td>46771</td>
        <td>3681</td>
        <td>9032</td>
        <td>10110</td>
        <td>52</td>
        <td class="table-button">
          <tng-block-button :color="'white'">7 138</tng-block-button>
        </td>
        <td class="table-button">
        </td>
      </tr>
      <tr>
        <td>8915</td>
        <td>7485509</td>
        <td>7801</td>
        <td>46771</td>
        <td>2733</td>
        <td>1029</td>
        <td>10110</td>
        <td>54</td>
        <td class="table-button">
        </td>
        <td class="table-button">
          <tng-block-button :color="'red'" :roundSides="'right'">19 505</tng-block-button>
        </td>
      </tr>
      <tr class="tng-text-orange">
        <td>7812</td>
        <td>8784312</td>
        <td>18</td>
        <td>591</td>
        <td>487</td>
        <td>71</td>
        <td>01001</td>
        <td>54</td>
        <td class="table-button">
          <tng-block-button>90 245</tng-block-button>
        </td>
        <td class="table-button">
          <tng-block-button :color="'light-blue'" :roundSides="'right'">8 673</tng-block-button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- <div class="buttons">
    <tng-block-button :color="'light-blue'" :textPosition="'br'">754 39</tng-block-button>
  </div> -->
</section>
</template>

<script lang="ts">
import Vue from 'vue';
import TngBlockButton from '@/components/tng-panel/TngBlockButton.vue';

export default Vue.extend({
  components: {
    TngBlockButton,
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/tng.scss';

.container {
  display: flex;
}
table {
  flex: 1 1 100%;
  font-size: 38px;
}
td {
  padding: 4px 12px;
  border-spacing: 8px;
  text-align: end;
}
.table-button {
  width: 80px;
}

@media only screen and (max-width: 899px) {
  table {
    font-size: 28px;
  }
}
</style>
