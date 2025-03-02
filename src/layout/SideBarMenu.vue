<template>
  <div class="flex-1">
    <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
      <RouterLink :to="{ name: 'dashboard' }"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
        <Home class="h-4 w-4" />
        Dashboard
      </RouterLink>
      <a href="#"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
        <ShoppingCart class="h-4 w-4" />
        Orders
        <Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          6
        </Badge>
      </a>
      <RouterLink :to="{ name: 'merchants' }"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
        <Store class="h-4 w-4" />
        Merchants
      </RouterLink>
      <RouterLink :to="{ name: 'customers' }"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
        <Users class="h-4 w-4" />
        Customers
      </RouterLink>
      <a href="#"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
        <LineChart class="h-4 w-4" />
        Analytics
      </a>
    </nav>
  </div>
</template>

<script setup>

import { Badge } from '@/components/ui/badge';
import { Home, LineChart, ShoppingCart, Users, Store } from 'lucide-vue-next'
</script>