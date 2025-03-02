<template>
  <Dialog :open="authStore.isLoginOpen" @update:open="authStore.handleLoginDialog">
    <DialogContent class="max-w-[420px]">
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Enter your email below to login to your account
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email" :class="errors.email && 'text-red-500'">Email</Label>
            <Input v-model="email" id="email" type="email" placeholder="m@example.com"
              :class="errors.email && 'focus-visible:ring-red-500 focus:border-red-500 border-red-500'" />
            <span v-show="errors.email" class="text-sm font-semibold text-red-500">{{ errors.email }}</span>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password" :class="errors.password && 'text-red-500'">Password</Label>
              <a href="#" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input v-model="password" id="password" type="password"
              :class="errors.password && 'focus-visible:ring-red-500 focus:border-red-500 border-red-500'" />
            <span v-show="errors.password" class="text-sm font-semibold text-red-500">{{ errors.password }}</span>
          </div>
          <Button type="submit" class="w-full" :disabled="isPending">
            <LoaderCircle v-if="isPending" class="animate-spin" />
            <span v-else>Login</span>
          </Button>
          <Button variant="outline" class="w-full">
            Login with Google
          </Button>
        </div>
      </form>
      <DialogFooter class="mt-4 sm:justify-center text-sm">
        <div class="text-sm">
          Don't have an account?
          <a type="button" @click="showSignUpDialog" class="underline cursor-pointer">
            Sign up
          </a>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { LoaderCircle } from 'lucide-vue-next';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import * as yup from "yup";
import { useLoginMutation } from '@/api/authApi';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useForm, useField } from 'vee-validate';
import router from '@/router';

const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

const { isPending,
  isError,
  error,
  isSuccess,
  mutate } = useLoginMutation()

const loginFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
});

const { handleSubmit, errors, validate } = useForm({
  validationSchema: loginFormSchema,
});

const { value: email } = useField('email');
const { value: password } = useField('password');

const onSubmit = handleSubmit(async (values) => {
  const result = await validate();
  if (!result.valid) return;
  mutate(values);
  redirectUser()
});

const redirectUser = () => {
  if (user.value.type === 'master') {
    router.push({ name: 'admin' })
  }
  authStore.handleLoginDialog()
}

const showSignUpDialog = () => {
  authStore.handleLoginDialog()
  authStore.handleRegistrationDialog()
}

</script>