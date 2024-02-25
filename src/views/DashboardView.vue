<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import { computed, onMounted, ref } from 'vue'
import DropdownClass from '@/components/Dropdowns/DropdownClass.vue'
import DropdownSentence from '@/components/Dropdowns/DropdownSentence.vue'

const text1 =
  'How did Xi Jinping took years and all kind of dirty methods to kill all his enemies and make himself as a dictator in China?'
const text2 = 'How do I create a mobile app without writing code?'
const text3 = 'Is killing innocent Muslims in the name of cow protection justified?'

const inputValue = ref('')
const predictValue = ref('')
const rawValue = ref('')
const preprocessedValue = ref([])
const tfidfPerWordValue = ref([])
const priors = ref({})
const likelihoods = ref({})
const posteriors = ref({})

const selectedClass = ref(0)
const selectedQuestion = ref('')

interface Dataset {
  qid: string
  question_text: string
  target: number
}
const datasetItems = ref<Dataset[] | null>(null)
onMounted(async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/dataset')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data: Dataset[] = await response.json()
    datasetItems.value = data
  } catch (err) {
    console.error('Error fetching data:', err)
  }
})
const filteredDatasetItems = computed(() => {
  if (selectedClass.value == 0) {
    return datasetItems.value?.filter((item) => item.target == 0)
  } else if (selectedClass.value == 1) {
    return datasetItems.value?.filter((item) => item.target == 1)
  } else {
    return datasetItems
  }
})

const handleSelectedClass = (selectedValue: number) => {
  selectedClass.value = selectedValue
}

const handleSelectedQuestion = (selectedValue: string) => {
  selectedQuestion.value = selectedValue
  inputValue.value = selectedQuestion.value
}

function copyText(text: string) {
  inputValue.value = text
}

interface Prediction {
  predicted_class: string
  preprocessed_text: []
  tfidf_per_word: []
  priors: {}
  likelihoods: {}
  posteriors: {}
}
const items = ref<Prediction | null>(null)

async function predict() {
  try {
    const response = await fetch('http://127.0.0.1:5000/predict/' + inputValue.value)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    items.value = data
    if (items.value) {
      rawValue.value = inputValue.value
      predictValue.value = items.value.predicted_class
      preprocessedValue.value = items.value.preprocessed_text
      tfidfPerWordValue.value = items.value.tfidf_per_word
      priors.value = items.value.priors
      likelihoods.value = items.value.likelihoods
      posteriors.value = items.value.posteriors

      console.log(predictValue.value)
    } else {
      console.log('No data')
    }
  } catch (err) {
    console.error('Error fetching data:', err)
  }
}
</script>

<template>
  <DefaultLayout>
    <!-- <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <DataStatsOne />
    </div> -->
    <div class="mt-2 grid grid-cols-12 gap-4 md:mt-2 md:gap-6 2xl:mt-2 2xl:gap-7.5">
      <div
        class="col-span-12 rounded-lg bg-white px-5 pt-7.5 pb-5 shadow-default dark:bg-boxdark sm:px-7.5 xl:col-span-8"
      >
        <h4 class="text-xl font-bold text-black dark:text-white mb-5">Input Text</h4>
        <!-- <div class="flex justify-end gap-2 mb-5">
          <button
            class="bg-redlight rounded-lg text-red text-sm px-4 py-1 hover:bg-opacity-70"
            @click="copyText(text1)"
          >
            Text 1
          </button>
          <button
            class="bg-redlight rounded-lg text-red text-sm px-4 py-1 hover:bg-opacity-70"
            @click="copyText(text2)"
          >
            Text 2
          </button>
          <button
            class="bg-redlight rounded-lg text-red text-sm px-4 py-1 hover:bg-opacity-70"
            @click="copyText(text3)"
          >
            Text 3
          </button>
        </div> -->
        <div class="flex justify-end gap-2">
          <DropdownClass @classSelected="handleSelectedClass" />
          <DropdownSentence
            @questionSelected="handleSelectedQuestion"
            :items="filteredDatasetItems"
          />
        </div>

        <input
          id="input-text"
          v-model="inputValue"
          type="text"
          placeholder="Enter a question"
          class="w-full rounded-lg text-black bg-graylight py-3 px-5 font-normal outline-none transition dark:text-white dark:bg-form-input"
        />
        <div class="flex justify-end">
          <button
            @click="predict"
            class="rounded-full bg-red px-5 py-2 mt-3 font-normal text-white hover:bg-opacity-90 shadow-md"
          >
            Detect
          </button>
        </div>
      </div>

      <div
        class="col-span-12 rounded-lg bg-white px-5 pt-7.5 pb-5 shadow-default dark:bg-boxdark sm:px-7.5 xl:col-span-4"
      >
        <h4 class="text-xl font-bold text-black dark:text-white mb-5">Result</h4>
        <p class="text-md font-normal text-graydark mb-2">The predicted class is...</p>
        <h3 class="text-lg font-semibold text-red" v-text="predictValue"></h3>
      </div>
    </div>

    <div
      class="mt-4 rounded-lg px-5 pt-7.5 pb-7.5 dark:bg-boxdark sm:px-7.5 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"
    >
      <h4 class="text-xl font-bold text-black dark:text-white">The Process</h4>

      <!-- <div
        class="grid grid-cols-1 items-start justify-between gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
      > -->
      <div class="flex mt-5">
        <span
          class="mt-1 mr-6.5 flex h-12.5 w-full max-w-12.5 items-center justify-center rounded-full"
        >
          <span
            class="block h-12.5 w-full max-w-12.5 rounded-full bg-redlight text-lg text-red font-semibold text-center py-3"
            >1</span
          >
        </span>
        <div class="w-full">
          <p class="font-semibold text-graydark text-md mb-2">Raw Text</p>
          <p class="text-md font-normal text-graydark mb-2">
            To be classified text given by the user input
          </p>
          <p class="text-md font-normal text-black" v-text="rawValue"></p>
        </div>
      </div>

      <div class="flex mt-5">
        <span
          class="mt-1 mr-6.5 flex h-12.5 w-full max-w-12.5 items-center justify-center rounded-full"
        >
          <span
            class="block h-12.5 w-full max-w-12.5 rounded-full bg-redlight text-lg text-red font-semibold text-center py-3"
            >2</span
          >
        </span>
        <div class="w-full">
          <p class="font-semibold text-graydark text-md mb-2">Preprocessed Text</p>
          <p class="text-md font-normal text-graydark mb-2">
            Text that has undergone various cleaning steps, include tokenization, lowercasing,
            removing punctuation, and stop words
          </p>
          <p class="text-md font-normal text-black" v-text="preprocessedValue"></p>
        </div>
      </div>
      <!-- </div> -->
      <div class="flex mt-5">
        <span
          class="mt-1 mr-6.5 flex h-12.5 w-full max-w-12.5 items-center justify-center rounded-full"
        >
          <span
            class="block h-12.5 w-full max-w-12.5 rounded-full bg-redlight text-lg text-red font-semibold text-center py-3"
            >3</span
          >
        </span>
        <div class="w-full">
          <p class="font-semibold text-graydark text-md mb-2">TF-IDF</p>
          <p class="text-md font-normal text-graydark mb-4">
            The weight of each terms in a sentence based on their frequency (TF) and inverse
            document frequency (IDF)
          </p>
          <div class="grid grid-cols-1 gap-3 xl:grid-cols-4 md:grid-cols-4 sm:grid-cols-1">
            <div
              v-for="i in preprocessedValue.length"
              class="bg-white rounded-lg px-5 py-5 text-center"
            >
              <h2 class="text-lg font-medium text-graydark">{{ preprocessedValue[i - 1] }}</h2>
              <p class="text-md font-normal">{{ tfidfPerWordValue[i - 1] }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex mt-5">
        <span
          class="mt-1 mr-6.5 flex h-12.5 w-full max-w-12.5 items-center justify-center rounded-full"
        >
          <span
            class="block h-12.5 w-full max-w-12.5 rounded-full bg-redlight text-lg text-red font-semibold text-center py-3"
            >4</span
          >
        </span>
        <div class="w-full">
          <p class="font-semibold text-graydark text-md mb-2">Priors</p>
          <p class="text-md font-normal text-graydark mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quisquam vel. Harum,
            laudantium similique.
          </p>
          <div class="flex gap-4">
            <p class="text-md font-normal text-graydark" v-for="(val, index) in priors">
              <span class="font-medium">{{ index == 0 ? 'Sincere' : 'Insincere' }}</span
              >: {{ val }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex mt-5">
        <span
          class="mt-1 mr-6.5 flex h-12.5 w-full max-w-12.5 items-center justify-center rounded-full"
        >
          <span
            class="block h-12.5 w-full max-w-12.5 rounded-full bg-redlight text-lg text-red font-semibold text-center py-3"
            >5</span
          >
        </span>
        <div class="w-full">
          <p class="font-semibold text-graydark text-md mb-2">Likelihood</p>
          <p class="text-md font-normal text-graydark mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quisquam vel. Harum,
            laudantium similique.
          </p>
          <div class="flex gap-4">
            <p class="text-md font-normal text-graydark" v-for="(val, index) in likelihoods">
              <span class="font-medium">{{ index == 0 ? 'Sincere' : 'Insincere' }}</span
              >: {{ val }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex mt-5">
        <span
          class="mt-1 mr-6.5 flex h-12.5 w-full max-w-12.5 items-center justify-center rounded-full"
        >
          <span
            class="block h-12.5 w-full max-w-12.5 rounded-full bg-redlight text-lg text-red font-semibold text-center py-3"
            >6</span
          >
        </span>
        <div class="w-full">
          <p class="font-semibold text-graydark text-md mb-2">Posterior</p>
          <p class="text-md font-normal text-graydark mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quisquam vel. Harum,
            laudantium similique.
          </p>
          <div class="flex gap-4">
            <p class="text-md font-normal text-graydark" v-for="(val, index) in posteriors">
              <span class="font-medium">{{ index == 0 ? 'Sincere' : 'Insincere' }}</span
              >: {{ val }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
