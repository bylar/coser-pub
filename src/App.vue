<script setup lang="ts">
import index from './pages/index.vue';

const fit = () => {
  const rect = document.body.getBoundingClientRect();
  const rate = window.screen.width / 750;
  if (window.screen.width < 750) {
    document.getElementsByName("viewport")[0]
      .setAttribute("content", `width=750,initial-scale=${rate},minimum-scale=${rate},maximum-scale=${rate}`);
  } else {
    document.getElementsByName("viewport")[0]
      .setAttribute("content", `width=device-width, initial-scale=1.0`);
  }
  console.log('fit-complate', { rect, rate });
}
window.addEventListener('resize', () => fit());
fit();
</script>

<template>
  <index />
</template>

<style>
body {
  background: repeating-linear-gradient(0deg, #d8d8d81c, transparent 10px),
    repeating-linear-gradient(90deg, #d8d8d81c, transparent 10px) #fff5fc;

}

#app {
  -webkit-animation: color-change-2x 2s linear infinite alternate both;
  animation: color-change-2x 2s linear infinite alternate both;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow-x: hidden;
}

@media screen and (orientation: landscape) {

  /* 宽屏设备样式 */
  #app {
    max-width: 750px;
    margin: 0 auto;
  }
}
</style>
