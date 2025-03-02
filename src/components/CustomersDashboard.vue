<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">
      Customers
    </h1>
  </div>
  <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
    <div class="flex flex-col items-center gap-1 text-center">
      <h3 class="text-2xl font-bold tracking-tight">
        You have no customers
      </h3>

      <Button class="mt-4">
        Add New Customer
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from './ui/button/Button.vue';
</script>