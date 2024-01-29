<template>
  <div class="flex justify-center items-center w-full flex-col">
    <h2 class="text-5xl font-bold mb-8 text-white my-8">
      Context Upload
    </h2>
    <label class="w-fit text-2xl text-white">Beschreibung</label>
    <input
      class="my-8 block w-1/2 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      type="textarea"
      v-model="description"
    />
    <label
      class="w-1/2 flex flex-col justify-center items-center h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100"
    >
      <div
        class="flex flex-col justify-center items-center pt-5 pb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 8h10M7 12h10M9 16h6"
          />
        </svg>
        <p
          class="mb-2 text-sm text-gray-500"
          v-if="!file.value && !isSelected"
        >
          <span class="font-semibold">Click to upload</span> or drag
          and drop
        </p>
        <p v-else-if="isSelected" class="mb-2 text-sm text-gray-800">
          <span class="font-semibold">File selected:</span>
          {{ file?.name }}
        </p>
        <p class="text-xs text-gray-500">PDF or DOCX (MAX. 5MB)</p>
      </div>
      <input
        id="file-upload"
        type="file"
        class="hidden"
        @change="handleFileUpload"
      />
    </label>
    <button
      class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="uploadFile"
    >
      Upload File
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const file = ref({ value: null });
const description = ref('');
const isSelected = ref(false)
const uploadUrl = 'https://unterricht-ai-backend.onrender.com/api/files/upload';

const handleFileUpload = (event) => {
  if (event.target.files.length > 0) {
    file.value = event.target.files[0];
    console.log(file.value)
    if (file.value.name.length > 0) {
      isSelected.value = true;
     }
  }
};

const uploadFile = async () => {
  if (!file.value) {
    alert('Please select a file first.');
    return;
  }

  const fileNameWithoutExtension = file.value.name.replace(/\.[^/.]+$/, "");

  const formData = new FormData();
  formData.append('file', file.value);
  formData.append('filename', file.value.name);
  formData.append('title', fileNameWithoutExtension);
  formData.append('description', description.value);

   for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('File uploaded successfully:', result);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
</script>
