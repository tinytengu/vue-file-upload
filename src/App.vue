<script setup lang="ts">
import { computed, ComputedRef, ref } from "vue";
import { uploadFile } from "./api";
import { SelectedFile } from "./types";
import FileItem from "./components/FileItem.vue";

// Data
const selectedFiles = ref([] as SelectedFile[]);
const isUploading: ComputedRef<boolean> = computed(() =>
  selectedFiles.value.some((file) => file.status == "uploading")
);

// Functions
const onSelectFiles = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files === null) {
    return;
  }

  selectedFiles.value = [];

  Array.from(target.files).forEach((file: File) => {
    selectedFiles.value.push({
      file: file,
      percentage: 0,
      status: "pending",
    } as SelectedFile);
  });
};

const clearFiles = () => (selectedFiles.value = []);

const uploadSelectedFiles = () => {
  selectedFiles.value.forEach((file: SelectedFile, idx: number) => {
    file.status = "uploading";
    file.percentage = 0;

    uploadFile(file.file, (event: any) => {
      file.percentage = Math.round((100 * event.loaded) / event.total);
    })
      .then((response) => {
        console.log(response);
        file.status = "success";
      })
      .catch(() => {
        file.status = "failed";
      });
  });
};
</script>

<template>
  <main>
    <div class="wrapper">
      <!-- Files list -->
      <div class="files-list">
        <b v-if="selectedFiles.length">Files ({{ selectedFiles.length }}):</b>
        <!-- File item -->
        <FileItem
          v-for="file in selectedFiles"
          :key="file.file.name"
          :file="file"
        />
      </div>
      <!-- Hidden file input -->
      <input
        id="selectBtn"
        type="file"
        multiple
        title="Upload file"
        @change="onSelectFiles"
      />
      <div class="hr" v-if="selectedFiles.length" />
      <!-- Buttons -->
      <div class="buttons" :class="{ centered: selectedFiles.length === 0 }">
        <label
          class="button"
          :class="{ disabled: isUploading }"
          for="selectBtn"
        >
          Select files
        </label>
        <a
          class="button button-danger"
          :class="{ disabled: isUploading }"
          @click.prevent
          href="#"
          @click="clearFiles"
          v-if="selectedFiles.length"
          >Clear</a
        >
        <a
          class="button button-upload"
          :class="{ disabled: isUploading }"
          @click.prevent
          href="#"
          @click="uploadSelectedFiles"
          v-if="selectedFiles.length"
          >Upload</a
        >
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
#selectBtn {
  display: none;
}

.hr {
  width: 100%;
  height: 1px;
  background-color: lightgray;
}

.wrapper {
  width: 40%;
  padding: 2rem;
  border: 1px dashed lightgray;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.files-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.buttons {
  display: flex;
  gap: 1rem;

  &.centered {
    justify-content: center;
  }
}

.button {
  cursor: pointer;

  color: white;
  background: #809af0;
  text-decoration: none;

  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 2px;

  &:hover {
    background: #3f6cff;
  }

  &.disabled {
    cursor: default;
    background: lightgray;
    pointer-events: none;
  }
}

.button-danger {
  background: #f08080;

  &:hover {
    background: #f65959;
  }
}

.button-upload {
  background: #00d591;

  &:hover {
    background: #02b97f;
  }
}
</style>
