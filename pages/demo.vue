<template>
  <div class="container mx-auto flex flex-col items-center h-full text-white">
    <h2 class="text-5xl font-bold mb-8 my-8">Unterrichtsstunde generieren</h2>
    <transition name="fade" mode="out-in">
      <div
        :key="currentPageIndex"
        class="page text-center h-full flex flex-col flex-1"
      >
        <h1 class="text-3xl font-bold">
          {{ currentPage.title }}
        </h1>
        <div
          class="flex flex-col justify-center items-center"
          v-if="currentPageIndex !== pages.length - 1"
        >
          {{ currentPage.desc }}

          <Dropdown
            v-if="currentPageIndex !== pages.length - 2"
            :options="currentPage.items"
            :placeholder="currentPage.placeholder"
            @select="handleSelect"
          ></Dropdown>

          <div v-if="currentPageIndex == pages.length - 2">
            <ul
              class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 mt-6"
            >
              <li
                v-for="topic in selectedValues.topics"
                :key="topic"
                class="flex items-center"
              >
                <svg
                  class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                  />
                </svg>
                {{ topic }}
              </li>
            </ul>

            <input
              class="mt-8 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              v-model="currentTopic"
            />
            <button
              class="border-2 bg-white text-black border-black hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full font-bold mt-6"
              @click="addTopic"
            >
              Hinzufügen
            </button>
          </div>
        </div>
        <div v-else class="results-container">
          <div
            v-for="(value, key) in selectedValues"
            :key="key"
            class="result-item"
          >
            <div v-if="key !== 'topics'">
              <h3 class="result-title">
                {{ capitalizeFirstLetter(key) }}
              </h3>
              <p class="result-value">{{ value.text }}</p>
            </div>
            <div v-else>
              <h3 class="result-title">
                {{ capitalizeFirstLetter(key) }}
              </h3>
              <ul>
                <li v-for="topic in value" :key="topic" class="result-value">
                  {{ topic }}
                </li>
              </ul>
            </div>
          </div>

          <button
            @click="fetchHandler"
            class="border-2 bg-white text-black border-black hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full font-bold mt-6"
          >
            Abschicken
          </button>
        </div>
      </div>
    </transition>
    <button
      v-if="currentPageIndex !== pages.length - 1"
      @click="navigateToNextPage"
      class="border-2 bg-white border-black text-black hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full font-bold mt-8 disabled:opacity-50 disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
      :disabled="!isValueSelected"
    >
      Weiter
    </button>
  </div>
</template>

<script setup>
const currentPageIndex = ref(0);
const currentTopic = ref('');
const selectedValues = ref({
  country: '',
  schooltype: '',
  class: '',
  subject: '',
  topics: [],
  contextPdfs: [],
});

const pages = [
  {
    title: 'Bundesland',
    input: 'country',
    desc: 'Bitte geben Sie an, wo sich Ihre Einrichtung befindet, damit wir die geltenden Rechtsvorschriften bewerten können.',
    items: [
      { text: 'Baden-Württemberg', value: 1 },
      { text: 'Bayern', value: 2 },
      { text: 'Berlin', value: 3 },
      { text: 'Brandenburg', value: 4 },
      { text: 'Bremen', value: 5 },
      { text: 'Hamburg', value: 6 },
      { text: 'Hessen', value: 7 },
      { text: 'Niedersachsen', value: 8 },
      { text: 'Mecklenburg-Vorpommern', value: 9 },
      { text: 'Nordrhein-Westfalen', value: 10 },
      { text: 'Rheinland-Pfalz', value: 11 },
      { text: 'Saarland', value: 12 },
      { text: 'Sachsen', value: 13 },
      { text: 'Sachsen-Anhalt', value: 14 },
      { text: 'Schleswig-Holstein', value: 15 },
      { text: 'Thüringen', value: 16 },
    ],
    placeholder: 'Auswählen',
  },
  {
    title: 'Schulform',
    input: 'schooltype',
    desc: 'Bitte wähle eine Schulform',
    items: [
      { text: 'Gymnasium', value: 1 },
      { text: 'Realschule', value: 2 },
      { text: 'Hauptschule', value: 3 },
      { text: 'Grundschule', value: 4 },
      { text: 'Förderschule', value: 5 },
    ],
    placeholder: 'Auswählen',
  },
  {
    title: 'Klasse',
    input: 'class',
    desc: 'Bitte wähle die Klassenstufe',
    items: [
      { text: '1', value: 1 },
      { text: '2', value: 2 },
      { text: '3', value: 3 },
      { text: '4', value: 4 },
      { text: '5', value: 5 },
      { text: '6', value: 6 },
      { text: '7', value: 7 },
      { text: '8', value: 8 },
      { text: '9', value: 9 },
      { text: '10', value: 10 },
      { text: '11', value: 11 },
      { text: '12', value: 12 },
      { text: '13', value: 13 },
    ],
    placeholder: 'Auswählen',
  },
  {
    title: 'Schulfach',
    input: 'subject',
    desc: 'Bitte wähle ein Schulfach',
    items: [
      { text: 'Biologie', value: 1 },
      { text: 'Deutsch', value: 2 },
      { text: 'Mathematik', value: 3 },
      { text: 'Physik', value: 4 },
      { text: 'Chemie', value: 5 },
      { text: 'Geschichte', value: 6 },
      { text: 'Geografie', value: 7 },
      { text: 'Sozialkunde', value: 8 },
      { text: 'Englisch', value: 9 },
      { text: 'Französisch', value: 10 },
      { text: 'Kunst', value: 11 },
      { text: 'Musik', value: 12 },
      { text: 'Sport', value: 13 },
      { text: 'Informatik', value: 14 },
      { text: 'Religion/Ethik', value: 15 },
    ],
    placeholder: 'Auswählen',
  },
  {
    title: 'Themen',
    input: 'themen',
    placeholder: 'Auswählen',
  },
  {
    title: 'Übersicht',
  },
];

const isTopicListValid = computed(() => selectedValues.value.topics.length > 0);

const isValueSelected = computed(() => {
  const inputType = currentPage.value.input;
  if (inputType === 'themen') {
    return isTopicListValid.value;
  }
  return (
    selectedValues.value[inputType] &&
    selectedValues.value[inputType].text !== ''
  );
});

const fetchHandler = async () => {
  const uploadUrl = 'https://unterricht-ai-backend.onrender.com/api/ai/prompt';

  const query = { query: selectedValues.value };
  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Response received:', result);

    // Handle the response as needed
  } catch (error) {
    console.error('Error while sending data:', error);
  }
};
const currentPage = computed(() => pages[currentPageIndex.value]);

const navigateToNextPage = () => {
  if (currentPageIndex.value < pages.length - 1) {
    currentPageIndex.value += 1;
  } else {
    console.log('Form Submitted!');
  }
};

const addTopic = () => {
  if (currentTopic.value) {
    selectedValues.value.topics.push(currentTopic.value);
    currentTopic.value = '';
  }
};

const handleSelect = (value) => {
  const inputType = currentPage.value.input;
  selectedValues.value[inputType] = value;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.results-container {
  display: flex;
  flex-flow: wrap;
  align-items: center;
  margin-top: 20px;
  width: 400px;
  justify-content: center;
}

.result-item {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 400px;
}

.result-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.result-value {
  font-size: 1rem;
  color: #666;
}

.submit-button {
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #007bff;
  color: white;
}
</style>
