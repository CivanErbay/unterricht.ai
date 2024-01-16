<template>
  <div
    class="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center"
  >
    <!-- Dropdowns and Submit Section -->
    <section class="container mx-auto py-16">
      <div class="grid grid-cols-1 gap-4 text-center">
        <!-- Country Dropdown -->
        <select
          v-model="selectedCountry"
          class="bg-gray-800 rounded-lg p-2 text-gray-300"
        >
          <option disabled value="">Select Country</option>
          <option>Germany</option>
        </select>

        <!-- Region Dropdown -->
        <select
          v-model="selectedRegion"
          class="bg-gray-800 rounded-lg p-2 text-gray-300"
        >
          <option disabled value="">Select Region</option>
          <option v-for="region in regions" :key="region">
            {{ region }}
          </option>
        </select>

        <!-- School Type Dropdown -->
        <select
          v-model="selectedSchoolType"
          @change="updateGrades"
          class="bg-gray-800 rounded-lg p-2 text-gray-300"
        >
          <option disabled value="">Select School Type</option>
          <option v-for="type in schoolTypes" :key="type">
            {{ type }}
          </option>
        </select>

        <!-- Grade Dropdown -->
        <select
          v-model="selectedGrade"
          class="bg-gray-800 rounded-lg p-2 text-gray-300"
        >
          <option disabled value="">Select Grade</option>
          <option v-for="grade in grades" :key="grade">
            {{ grade }}
          </option>
        </select>

        <!-- Teaching Type Dropdown -->
        <select
          v-model="selectedTeachingType"
          class="bg-gray-800 rounded-lg p-2 text-gray-300"
        >
          <option disabled value="">Select Teaching Type</option>
          <option>Regulär</option>
          <option>Reformpädagogisch</option>
        </select>

        <!-- Subject Dropdown -->
        <select
          v-model="selectedSubject"
          class="bg-gray-800 rounded-lg p-2 text-gray-300"
        >
          <option disabled value="">Select Subject</option>
          <option v-for="subject in subjects" :key="subject">
            {{ subject }}
          </option>
        </select>

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload Stundenplan
        </button>

        <!-- Submit Button -->
        <button
          @click="submitForm"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const selectedCountry = ref('');
const selectedRegion = ref('');
const selectedSchoolType = ref('');
const selectedGrade = ref('');
const selectedTeachingType = ref('');
const selectedSubject = ref('');
const regions = ref([
  'Baden-Württemberg',
  'Bavaria',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hesse',
  'Lower Saxony',
  'Mecklenburg-Vorpommern',
  'North Rhine-Westphalia',
  'Rhineland-Palatinate',
  'Saarland',
  'Saxony',
  'Saxony-Anhalt',
  'Schleswig-Holstein',
  'Thuringia',
]);
const schoolTypes = ref([
  'Grundschule',
  'Gymnasium',
  'Realschule',
  'Hauptschule',
  'Gesamtschule',
  'Sonderschule',
]);
const subjects = ref([
  'German',
  'English',
  'Physics',
  'Religion',
  'Sports',
  'Math',
  'History',
  'Biology',
  'Chemistry',
  'Geography',
  'Art',
  'Music',
  'Computer Science',
]);
const grades = ref();

const updateGrades = () => {
  switch (selectedSchoolType.value) {
    case 'Grundschule':
      grades.value = Array.from({ length: 4 }, (_, i) => i + 1);
      break;
    case 'Hauptschule':
    case 'Realschule':
    case 'Sonderschule':
      grades.value = Array.from({ length: 6 }, (_, i) => i + 5);
      break;
    case 'Gymnasium':
    case 'Gesamtschule':
      grades.value = Array.from({ length: 9 }, (_, i) => i + 5);
      break;
    default:
      grades.value = [];
  }
};

const submitForm = async () => {
  const formData = {
    country: selectedCountry.value,
    region: selectedRegion.value,
    schoolType: selectedSchoolType.value,
    grade: selectedGrade.value,
    teachingType: selectedTeachingType.value,
    subject: selectedSubject.value,
  };
  try {
    const response = await axios.post('your-api-endpoint', formData);
    console.log(response.data);
    // Handle response
  } catch (error) {
    console.error(error);
    // Handle error
  }
};
</script>

<style scoped>
/* Tailwind CSS styles */
</style>
