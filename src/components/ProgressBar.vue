<script setup lang="ts">
defineProps<{
  progress?: number;
}>();
</script>

<template>
  <div class="progress-wrapper">
    <div class="progress" :style="`width: ${progress}%;`"></div>
  </div>
</template>

<style scoped lang="scss">
.progress-wrapper {
  width: 100%;
  height: 1rem;

  padding: 0.2rem;

  background-color: rgb(235, 235, 235);
  border-radius: 0.5rem;
}

.progress {
  height: 100%;

  background: rgb(0, 157, 255);
  border-radius: 0.5rem;
}
</style>
