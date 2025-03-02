<template>
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <SideBarTop />
        <SideBarMenu />
      </div>
    </div>
    <div class="flex flex-col">
      <HeaderBar />
      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <router-view />
      </main>

    </div>
  </div>
</template>

<script setup>
import { useGetUserQuery } from '@/api/authApi';
import HeaderBar from '@/layout/HeaderBar.vue'
import SideBarMenu from '@/layout/SideBarMenu.vue'
import SideBarTop from '@/layout/SideBarTop.vue'

const { status, data, error } = useGetUserQuery()


</script>