import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)
  const isLoginOpen = ref(false)
  const isRegOpen = ref(false)

  if (localStorage.getItem("user")) {
    user.value = JSON.parse(localStorage.getItem("user"));
  }

  const isLoggedIn = computed(() => !!user.value)

  const handleLoginDialog = () => {
    isLoginOpen.value = !isLoginOpen.value
  }

  const handleRegistrationDialog = () => {
    isRegOpen.value = !isRegOpen.value
  }

  return { isLoggedIn, isLoginOpen, isRegOpen, user, handleLoginDialog, handleRegistrationDialog }
})