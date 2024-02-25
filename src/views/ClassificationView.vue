<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DataTable from '@/components/Tables/DataTable.vue'

const pageTitle = ref('Classification')
interface Dataset {
  qid: string
  question_text: string
  target: number
}
const items = ref<Dataset[] | null>(null)
const itemsPerPage = ref(10)
const currentPage = ref(1)

const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return items.value?.slice(startIndex, endIndex) || []
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

function showAccuracy() {
  let textAccuracy = document.getElementById('text-accuracy')
  textAccuracy?.classList.remove('hidden')
}

onMounted(async () => {
  try {
    const response = await fetch('https://quora-model-api.onrender.com/dataset')

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
      <div class="flex justify-end">
        <h4 id="text-accuracy" class="pt-1.5 mx-3.5 text-black font-medium hidden">0.82%</h4>
        <button
          @click="showAccuracy"
          class="bg-red text-white text-sm font-normal mb-4 px-4 py-1.5 shadow-default rounded-full hover:bg-opacity-90"
        >
          Accuracy
        </button>
      </div>
      <DataTable :items="displayedItems" :currentPage="currentPage" :itemsPerPage="itemsPerPage" />
      <p>{{ console.log(items) }}</p>
      <div class="flex flex-col items-center mt-7">
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
      </div>
    </div>
  </DefaultLayout>
</template>
