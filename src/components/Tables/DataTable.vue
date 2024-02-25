<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  }
})

// const filteredItems = computed(() => {
//   if (searchFilter.value === '') {
//     return items.filter(
//       (item) =>
//         item.question_text.includes(searchFilter.value) || item.target.includes(searchFilter.value)
//     )
//   }
//   return items
// })

// const handleSearch = (search) => {
//   searchFilter.value = search
// }
</script>

<template>
  <div class="bg-white relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-normal">
      <thead class="text-xs text-black font-medium uppercase bg-white border-b border-whiten">
        <tr>
          <th class="px-4 py-3">QID</th>
          <th class="px-4 py-3">Question Text</th>
          <th class="px-4 py-3">Label</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(item, index) in items" :key="index" class="odd:bg-white even:bg-gray-2">
          <td class="px-4 py-3 font-normal text-graydark">{{ item.qid }}</td>
          <td class="px-4 py-3 font-normal text-graydark">{{ item.question_text }}</td>
          <td class="px-4 py-3 font-normal text-graydark">
            {{ item.target === 1 ? 'Insincere' : 'Sincere' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
