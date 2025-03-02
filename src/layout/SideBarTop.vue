<template>
  <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
    <a href="/" class="flex items-center gap-2 font-semibold">
      <Package2 class="h-6 w-6" />
      <span class="">App Name</span>
    </a>
    <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
      <Bell class="h-4 w-4" />
      <span class="sr-only">Toggle notifications</span>
    </Button>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { Bell, Package2 } from 'lucide-vue-next' 
</script>