<script setup lang="ts">
import { SelectedFile } from "../types";
import ProgressBar from "./ProgressBar.vue";

defineProps<{
  file: SelectedFile;
}>();
</script>

<template>
  <div
    class="fileitem-wrapper"
    :class="{
      'failed-border': file.status == 'failed',
      'success-border': file.status == 'success',
    }"
  >
    <!-- Upper -->
    <div>
      {{ file.file.name }}
    </div>
    <!-- Lower -->
    <div v-if="file.percentage">
      <span v-if="file.status == 'failed'">
        <b class="failed">Failed</b>
      </span>
      <span v-if="file.status == 'success'">
        <b class="success">OK</b>
      </span>
      <div class="fileitem-progress">
        <ProgressBar
          v-if="file.status == 'uploading'"
          :progress="file.percentage"
        />
        <span v-if="file.status == 'uploading'">
          <b> {{ file.percentage }}% </b>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fileitem-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  border: 1px dashed lightgray;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.fileitem-progress {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.failed {
  color: red;
}

.success {
  color: green;
}

.failed-border {
  border-color: red;
}

.success-border {
  border-color: green;
}
</style>
