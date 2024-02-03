<template>
  <div class="flex flex-col items-center">
    <div
      v-if="!receivedResult"
      class="container mx-auto flex flex-col items-center h-full text-white"
    >
      <h2 class="text-5xl font-bold mb-8  my-8">
        Unterrichtsstunde generieren
      </h2>
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
              v-if="currentPageIndex !== pages.length - 3 && currentPageIndex !== pages.length - 2"
              :options="currentPage.items"
              :placeholder="currentPage.placeholder"
              @select="handleSelect"
            ></Dropdown>

            <div v-if="currentPageIndex == pages.length - 3">
              <input
                class="mt-8 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                v-model="mainTopic"
                v-if="selectedValues.topic.length <= 0"
              />
              <h3 class="text-2xl mt-3 font-bold">
                {{ selectedValues.topic }}
              </h3>

              <button
                class="border-2 bg-white text-black border-black hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full font-bold mt-6"
                @click="addMainTopic"
                v-if="selectedValues.topic.length <= 0"
              >
                Thema hinzufügen
              </button>
              <div v-if="selectedValues.topic.length > 0">
                <h2 class="text-2xl font-bold mt-8 underline">
                  {{ currentPage.subheadline }}
                </h2>
                <input
                  class="mt-4 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  v-model="currentTopic"
                />
                <ul
                  class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 mt-6"
                >
                  <li
                    v-for="topic in selectedValues.keywords"
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
                <button
                  class="border-2 bg-white text-black border-black hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full font-bold mt-6"
                  @click="addTopic"
                >
                  Schwerpunkt hinzufügen
                </button>
              </div>
            </div>

            <div v-if="currentPageIndex == pages.length - 2">
              <div
                v-for="(pdf, index) in pdfData"
                :key="index"
                class="flex items-center mt-4"
              >
                <input
                  id="default-checkbox"
                  type="checkbox"
                  v-model="pdf.isSelected"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >{{ pdf.title }}</label
                >
              </div>
            </div>
          </div>
          <div v-else class="results-container">
            <!-- <div
            v-for="(value, key) in selectedValues"
            :key="key"
            class="result-item"
          > -->
            <!-- <div v-if="key !== 'topic'">
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
                <li
                  v-for="val in value"
                  :key="val"
                  class="result-value"
                >
                  {{ val }}
                </li>
              </ul>
            </div> -->
            <div class="result-item text-black">
              <pre>
              {{ selectedValues }}
            </pre
              >
            </div>

            <button
              @click="fetchAI"
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
    <Result v-if="receivedResult" :items="receivedResult"></Result>
    <!--  <Result
      :items='[
      {title:"Lorem", duration: "10mins", content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."}, 
      {title:"Lorem", duration: "10mins", content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
      {title:"Lorem", duration: "10mins", content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."}
      ]'
    ></Result> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const pdfData = ref({ data: [] });
const pdfFetchError = ref(null);

async function fetchPdf() {
  try {
    const response = await fetch('https://unterricht-ai-backend.onrender.com/api/files/context-relations');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const fetchedData = await response.json();
    pdfData.value = fetchedData.data.map(pdf => ({ ...pdf, isSelected: false }));
  } catch (err) {
    console.error("Failed to fetch data:", err.message);
    pdfFetchError.value = err.message;
  }
}

onMounted( async () => {
  await fetchPdf();
})

const currentPageIndex = ref(0);
const currentTopic = ref('');
const mainTopic = ref('');
const receivedResult = ref(null)
const selectedValues = ref({
  state: '',
  school_type: '',
  grade: '',
  topic: '',
  subject: '',
  keywords: [],
  context: []
});


const pages = [
  {
    title: 'Bundesland',
    input: 'state',
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
    input: 'school_type',
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
    title: 'Stufe',
    input: 'grade',
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
        placeholder: "Auswählen"
  },
  {
    title: 'Unterrichtsthema',
    input: 'keywords',
    subheadline: 'Schwerpunkte'
  },
  {
    title: 'Kontext PDF Auswahl',
    input: 'content',
  },
  {
    title: 'Übersicht',
  },
];

const isTopicListValid = computed(() => selectedValues.value.keywords.length > 0);

const isValueSelected = computed(() => {
  if (currentPageIndex.value === pages.length - 2) {
    return true;
  }

  const inputType = currentPage.value.input;
  if (inputType === 'themen') {
    return isTopicListValid.value;
  }

  return selectedValues.value[inputType] && selectedValues.value[inputType].text !== '';
});

const fetchAI = async () => {
  //const uploadUrl = 'https://unterricht-ai-backend.onrender.com/api/ai/prompt';
  const uploadUrl = 'http://localhost:3002/api/ai/prompt';

  const query = selectedValues.value
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
    receivedResult.value = result;
  } catch (error) {
    console.error('Error while sending data:', error);
  }
};
const currentPage = computed(() => pages[currentPageIndex.value]);

const navigateToNextPage = () => {
  if (currentPageIndex.value === pages.length - 2) {

    const flattenedVectorStoreIds = pdfData.value
      .filter(pdf => pdf.isSelected)
      .flatMap(pdf => pdf.vector_store_ids);

    selectedValues.value.context = flattenedVectorStoreIds;
  }
  if (currentPageIndex.value < pages.length - 1) {
    currentPageIndex.value += 1;
  } else {
    console.log('Form Submitted!');
  }
};

const addMainTopic = () => {
  if (mainTopic.value) {
    selectedValues.value.topic = mainTopic.value;
  }
};

const addTopic = () => {
  if (currentTopic.value) {
    selectedValues.value.keywords.push(currentTopic.value);
    currentTopic.value = '';
  }
};

const handleSelect = (value) => {
  const inputType = currentPage.value.input;
  selectedValues.value[inputType] = value.text;
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
