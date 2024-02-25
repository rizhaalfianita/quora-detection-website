<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DataTable from '@/components/Tables/DataTable.vue'

const pageTitle = ref('Dataset')
interface Dataset {
  qid: string
  question_text: string
  target: number
}
const items = ref<Dataset[] | null>(null)
const itemsPerPage = ref(100)
const currentPage = ref(1)
const searchFilter = ref('')
const radioFilter = ref('')

const search = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    return (searchFilter.value = (e.target as HTMLInputElement).value)
  }
}

const filter = (e: Event) => {
  radioFilter.value = (e.target as HTMLInputElement).value
  console.log(radioFilter.value)
}

const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  const slicedItem = items.value?.slice(startIndex, endIndex) || []
  let filteredItem = slicedItem
  switch (radioFilter.value) {
    case 'Sincere':
      filteredItem = slicedItem.filter((item) => item.target == 0)
      break
    case 'Insincere':
      filteredItem = slicedItem.filter((item) => item.target == 1)
      break
  }
  if (searchFilter.value != '') {
    return (filteredItem = slicedItem.filter((item) =>
      item.question_text.toLowerCase().includes(searchFilter.value.toLowerCase())
    ))
  } else {
    return filteredItem
  }
})

const filteredItems = (() => {
  let filtered = items.value ?? []

  switch (radioFilter.value) {
    case 'Sincere':
      filtered = filtered.filter((item) => item.target == 0)
      break
    case 'Insincere':
      filtered = filtered.filter((item) => item.target == 1)
      break
  }

  if (searchFilter.value !== '') {
    filtered = filtered.filter((item) =>
      item.question_text.toLowerCase().includes(searchFilter.value.toLowerCase())
    )
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil((items.value?.length || 0) / itemsPerPage.value)
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

onMounted(async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/dataset')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data: Dataset[] = await response.json()
    items.value = data
  } catch (err) {
    console.error('Error fetching data:', err)
  }
})
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <div class="px-5 py-3">
      <div class="mb-6 flex justify-end gap-7">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search-icon"
            class="bg-transparent border-b border-bodydark text-gray-900 text-sm outline-0 focus:ring-0 block w-full ps-8 p-2.5"
            placeholder="Search..."
            @keyup.enter="search"
          />
        </div>
        <fieldset class="flex gap-3">
          <legend class="sr-only">Class</legend>
          <div class="flex items-center">
            <input
              id="country-option-1"
              type="radio"
              name="classes"
              value="Sincere"
              @change="filter"
              class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-0"
            />
            <label
              for="country-option-1"
              class="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Sincere
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="country-option-2"
              type="radio"
              name="classes"
              value="Insincere"
              @change="filter"
              class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-0"
            />
            <label
              for="country-option-2"
              class="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Insincere
            </label>
          </div>
        </fieldset>
      </div>
      <DataTable :items="filteredItems" :currentPage="currentPage" :itemsPerPage="itemsPerPage" />
      <p>{{ console.log(items) }}</p>
      <!-- <div class="flex flex-col items-center mt-7">
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white">{{
            (currentPage - 1) * itemsPerPage + 1
          }}</span>
          to
          <span class="font-semibold text-gray-900 dark:text-white">{{
            Math.min(currentPage * itemsPerPage, items?.length || 0)
          }}</span>
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{ items?.length || 0 }}</span>
          Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          <button
            @click="prevPage"
            class="flex items-center justify-center px-4 py-1 text-md font-medium text-white bg-black border-r rounded-l hover:bg-opacity-90"
          >
            Prev
          </button>
          <button
            @click="nextPage"
            class="flex items-center justify-center px-4 py-1 text-md font-medium text-white bg-black rounded-r hover:bg-opacity-90"
          >
            Next
          </button>
        </div>
      </div> -->
    </div>
  </DefaultLayout>
</template>
