<template>
  <main>
    <router-view></router-view>
    <LoginDialog />
    <RegistrationDialog />
  </main>
</template>

<script setup>
import LoginDialog from './components/auth/LoginDialog.vue';
import RegistrationDialog from './components/auth/RegistrationDialog.vue';
</script>
