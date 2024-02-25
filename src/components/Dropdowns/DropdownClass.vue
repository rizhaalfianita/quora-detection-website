<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
onMounted(() => {
  initFlowbite()
})

const emit = defineEmits(['classSelected'])
const selectedOptionVal = ref('Select class')
const selectedClass = ref(0)
const selectOption = (e: Event) => {
  selectedOptionVal.value = (e.target as HTMLLIElement).textContent ?? ''
  console.log(selectedOptionVal.value)
  selectedClass.value = selectedOptionVal.value === 'Sincere' ? 0 : 1
  console.log(selectedClass.value)
  emit('classSelected', selectedClass.value)
}
</script>
<template>
  <button
    id="dropdownDelayButton"
    data-dropdown-toggle="dropdownDelay"
    data-dropdown-delay="500"
    data-dropdown-trigger="hover"
    class="bg-redlight rounded-lg text-red focus:outline-none font-medium text-sm px-4 py-2 mb-4 text-center inline-flex items-center"
    type="button"
  >
    {{ selectedOptionVal }}
    <svg
      class="w-2.5 h-2.5 ms-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>

  <!-- Dropdown menu -->
  <div
    id="dropdownDelay"
    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
  >
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
      <li class="block px-4 py-2 hover:bg-whiten cursor-pointer" @click="selectOption">Sincere</li>
      <li class="block px-4 py-2 hover:bg-whiten cursor-pointer" @click="selectOption">
        Insincere
      </li>
    </ul>
  </div>
</template>
