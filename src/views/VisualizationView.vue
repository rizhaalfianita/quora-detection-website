<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const pageTitle = ref('Visualization')
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <div class="rounded-lg bg-white px-5 pt-7.5 pb-5 shadow-default dark:bg-boxdark sm:px-7.5">
      <h4 class="text-xl font-bold text-black dark:text-white mb-4">Confusion Matrix</h4>
      <table class="table-fixed w-full text-md text-left">
        <thead class="text-black font-medium">
          <tr>
            <th class="py-3">Classification</th>
            <th class="py-3">True Positive</th>
            <th class="py-3">True Negative</th>
          </tr>
        </thead>
        <tbody class="text-graydark font-normal">
          <tr>
            <td class="py-2">Manual</td>
            <td class="py-2">80</td>
            <td class="py-2">20</td>
          </tr>
          <tr>
            <td class="py-2">Multinomial Naive Bayes</td>
            <td class="py-2">50</td>
            <td class="py-2">18</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 grid grid-cols-2 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <div class="rounded-lg bg-white px-5 pt-7.5 pb-5 shadow-default dark:bg-boxdark sm:px-7.5">
        <h4 class="text-xl font-bold text-black dark:text-white mb-6">Class Distribution</h4>
        <div class="flex justify-center">
          <img
            src="../assets/images/statistic/class_distribution.png"
            class="object-contain w-100 h-50"
            alt=""
          />
        </div>
      </div>
      <div class="rounded-lg bg-white px-5 pt-7.5 pb-5 shadow-default dark:bg-boxdark sm:px-7.5">
        <h4 class="text-xl font-bold text-black dark:text-white mb-6">Model Accuracy</h4>
        <div class="flex justify-center">
          <img
            src="../assets/images/statistic/confusion_matrix.png"
            class="object-contain w-100 h-50"
            alt=""
          />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
