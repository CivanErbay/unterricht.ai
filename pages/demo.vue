<template>
  <div class="container mx-auto flex flex-col items-center h-full">
    <h2 class="text-5xl font-bold mb-8 text-white">AI Stundenplan Demo</h2>
    <transition name="fade" mode="out-in">
      <div
        :key="currentPageIndex"
        class="page text-center h-full flex flex-col flex-1"
      >
        <h1 class="text-3xl font-bold">Page {{ currentPageIndex + 1 }}</h1>
        <!-- <Dropdown v-if="currentPage !== pages - 1" /> -->
        <div class="flex-1" v-if="currentPageIndex !== pages.length - 1">
          {{ currentPage.title }}
          {{ currentPage.desc }}
        </div>
        <button
          @click="navigateToNextPage"
          v-else
          class="border-2 bg-white border-black hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full font-bold"
        >
          Submit
        </button>
      </div>
    </transition>
    <button
      v-if="currentPageIndex !== pages.length - 1"
      @click="navigateToNextPage"
      class="border-2 bg-white border-black hover:bg-blue-500 hover:text-white px-6 py-2 rounded-full font-bold"
    >
      Continue
    </button>
  </div>
</template>

<script setup>
// import Dropdown from '~/components/Dropdown.vue';

const currentPageIndex = ref(0);
const pages = [
  {
    title: 'Region',
    input: 'region',
    desc: 'Please state where your institution is located so we can evaluate the applicable legislation.',
  },
  {
    title: 'Methodology',
    input: 'methodology',
    desc: 'Please state which teaching methods you like to apply.',
  },
  {
    title: 'Submit',
    input: 'submit',
    desc: 'Thank you.',
  },
];

const currentPage = computed(() => pages[currentPageIndex.value]);

const navigateToNextPage = () => {
  if (currentPageIndex.value < pages.length - 1) {
    currentPageIndex.value += 1;
  } else {
    console.log('Form Submitted!');
  }
};
</script>

<style scoped>
/* Transition animation */
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
</style>
