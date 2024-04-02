<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
  import VerticalDivider from '@slidev/client/internals/VerticalDivider.vue'

  const style = getComputedStyle(document.documentElement);
  const baseFontSize = parseInt(style.fontSize, 10);
  const baseCodeFontSize = parseInt(style.getPropertyValue('--slidev-code-font-size'), 10);
  const baseCodeLineHeight = parseInt(style.getPropertyValue('--slidev-code-line-height'), 10);
  const zoomLevels = [0.25, 0.33, 0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5];
  const zoomIndex = ref(7);
  const zoomRatio = computed(() => zoomLevels[zoomIndex.value]);

  function zoomIn() {
    if (zoomIndex.value < zoomLevels.length - 1) {
      zoomIndex.value++;
    }
  }

  function zoomOut() {
    if (zoomIndex.value > 0) {
      zoomIndex.value--;
    }
  }

  function zoomReset() {
    zoomIndex.value = 7;
  }

  function getBrowserZoom() {
    return Math.round(window.devicePixelRatio * 100) / 100;
  }

  function resize() {
    const browserZoomRatio = getBrowserZoom();
    // Get the nearest zoomLevel level from our zoomLevels array
    const zoomLevelMap = zoomLevels.reduce<[number, number]>((acc, zoomLevel, i) => {
      if (Math.abs(zoomLevel - browserZoomRatio) < acc[1]) {
        return [i, Math.abs(zoomLevel - browserZoomRatio)]
      }
      return acc;
    }, [Infinity, Infinity])
    zoomIndex.value = zoomLevelMap[0]
  }

  watchEffect(() => {
    document.documentElement.style.fontSize = `${baseFontSize * zoomRatio.value}px`;
    document.documentElement.style.setProperty('--slidev-code-font-size', `${baseCodeFontSize * zoomRatio.value}px`);
    document.documentElement.style.setProperty('--slidev-code-line-height', `${baseCodeLineHeight * zoomRatio.value}px`);
  });

  onMounted(() => window.addEventListener('resize', resize));
  onUnmounted(() => window.removeEventListener('resize', resize));
</script>

<template>
  <VerticalDivider />
  <button class="slidev-icon-btn" @click="zoomIn" title="Zoom in">
    <carbon:zoom-in />
  </button>
  <button class="slidev-icon-btn" @click="zoomOut" title="Zoom out">
    <carbon:zoom-out />
  </button>
  <button class="slidev-icon-btn" @click="zoomReset" title="Reset zoom">
    <carbon:zoom-reset />
  </button>
  <div class="h-40px flex" p="l-1 t-0.5 r-2" text="sm leading-2">
    <div class="my-auto">
      {{ Math.round(zoomRatio * 100) }}%
    </div>
  </div>
</template>
