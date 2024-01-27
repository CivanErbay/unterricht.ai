import type { AuthError } from '@supabase/supabase-js'; import type {
AuthError } from '@supabase/supabase-js';
<template>
  <div class="my-dropdown">
    <div class="selected" @click="toggle">
      {{ selected === null ? placeholder : selected.text}}
    </div>
    <div class="options" v-show="isOpen">
      <div
        class="option"
        v-for="option in options"
        :key="option"
        @click="set(option)"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

// Define the props and emits
const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
  }
});

const emits = defineEmits(['select']);

const isOpen = ref(false);
const selected = ref(null);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const set = (option) => {
  selected.value = option;
  isOpen.value = false;
  emits('select', option);
};
</script>

<style scoped>

* { box-sizing: border-box; }
body { font-size: 62.5%; background: #71abc8; }

.my-dropdown {
  cursor: pointer;
  position: relative;
  min-width: 350px;
  display: flex;
  justify-content: center;
  margin: 30px 0;
  width: 235px;
}

.selected {
  position: relative;
  z-index: 2;
  display: block;
  background: transparent;
  border: 1.5px solid #fff;
  font: 1rem 'Avenir';
  color: #eaf4fb;
  text-align: left;
  white-space: nowrap;
  padding: 10px 20px;
  width: 235px;
  display: flex;
  justify-content: center;
}

.selected:after {
  opacity: 0.5;
  display: inline-block;
  margin-left: 10px;
}

.selected:hover:after {
  opacity: 1;
}

.options {
  flex-direction: column;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 100%;
  z-index: 1;
  width: 236px;
  background: #fff;
  border-radius: 0px;
  border: 0px solid #fff;
  color: #636363;
  transform: translate(24%, 0);
}

.option {
  padding: 10px 20px;
  font: 1rem 'Avenir';
}

.option:hover {
  background-color: #61c375;
  color: #eaf4fb;
}

.option:last-child {
  border-bottom: none;
}

.fade-enter-active, .fade-leave-active {
  transition: all .25s ease-out;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
	transform: translateY(-30px);
}

.fas.fa-angle-down {
  float: right;
  font-size: 1.4em;
}
</style>
