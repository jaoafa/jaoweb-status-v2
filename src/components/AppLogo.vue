<template>
  <svg
    class="BrandLogo"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 260.3 185.4"
    :height="height"
    :width="width"
  >
    <path
      class="st st0"
      d="M171.9,141.8c8,16.2,24.9,28.9,42.9,18.4c11.4-6.7,14.1-19,14.7-31.2c1.1-22.8-0.3-46-1.2-68.9
	c-0.2-5-0.4-10-0.7-15"
    />
    <polygon
      class="st"
      points="253.8,13.5 242.2,29.2 260.3,36.5 241.3,41.1 250.4,58.4 233,49.7 228.9,68.8 221,50.9 205.6,62.9 211.1,44.2
	191.6,43.5 207.9,32.7 193.4,19.6 212.8,21.7 210.1,2.4 223.6,16.5 233.9,0 235.2,19.5 "
    />
    <path
      class="st"
      d="M185.9,138l-16,24.6c-3.6,5.5-11.1,7.1-16.6,3.5l-3.6-2.3c-29.8,25-73.5,28.8-107.8,6.6C-0.2,143-12.2,86.7,15.1,44.7
	C42.5,2.6,98.7-9.4,140.8,17.9c34.3,22.3,48.6,63.7,37.9,101.1l3.6,2.3C187.9,124.9,189.5,132.4,185.9,138z"
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    height: {
      type: String,
      default: '100%',
    },
    width: {
      type: String,
      default: '100%',
    },
  },
})
</script>

<style lang="scss" scoped>
.st {
  fill: #ffb41d;
}

.st0 {
  fill: none;
  stroke: #ffb41d;
  stroke-width: 21;
  stroke-linecap: round;
  stroke-miterlimit: 10;
}
</style>
