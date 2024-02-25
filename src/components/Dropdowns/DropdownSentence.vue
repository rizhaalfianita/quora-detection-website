<script setup>
import { computed, onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'

defineProps({
  items: {
    type: Array,
    required: true
  }
})
onMounted(async () => {
  initFlowbite()
})

const emit = defineEmits(['questionSelected'])
const selectedOptionVal = ref('Select a question')
const selectedQuestion = ref('')
const selectOption = (e) => {
  selectedOptionVal.value = e.target.textContent ?? ''
  console.log(selectedOptionVal.value)
  selectedQuestion.value = selectedOptionVal.value
  console.log(selectedQuestion.value)
  emit('questionSelected', selectedQuestion.value)
}
const selectedItems = computed(() => {
  return items.filter((item) =>
    item.question_text.toLowerCase().includes(selectedQuestion.value.toLowerCase())
  )
})
</script>
<template>
  <button
    id="dropdownSearchButton"
    data-dropdown-toggle="dropdownSearch"
    data-dropdown-placement="bottom"
    class="bg-redlight rounded-lg text-red focus:outline-none font-medium text-sm px-4 py-2 mb-4 text-center inline-flex items-center"
    type="button"
  >
    <span class="max-w-20 sm:max-w-20 md:max-w-40 xl:max-w-40 truncate">{{
      selectedOptionVal
    }}</span>
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
  <div id="dropdownSearch" class="z-10 hidden bg-white rounded-lg shadow w-60">
    <!-- <div class="p-3">
      <label for="input-group-search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="input-group-search"
          class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          placeholder="Search user"
        />
      </div>
    </div> -->
    <ul
      class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700"
      aria-labelledby="dropdownSearchButton"
      v-if="items"
    >
      <li
        class="block px-4 py-2 hover:bg-whiten cursor-pointer"
        @click="selectOption"
        v-for="(item, index) in items"
        :key="index"
      >
        {{ item.question_text }}
      </li>
    </ul>
  </div>
</template>
