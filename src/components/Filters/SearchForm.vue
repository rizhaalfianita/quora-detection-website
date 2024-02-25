<script setup>
const emit = defineEmits(['search'])
const search = (e) => {
  emit('search', e.target.value)
}
</script>

<template>
  <form action="" class="py-3 flex items-center justify-end mb-2">
    <label for="" class="sr-only">Search</label>
    <div class="relative w-200">
      <input
        type="text"
        @input="search"
        class="bg-transparent focus:outline-none text-gray-900 text-sm border-b block w-full p-2.5"
        placeholder="Search"
      />
    </div>
  </form>
</template>
