<template>
  <Dialog :open="authStore.isRegOpen" @update:open="authStore.handleRegistrationDialog">
    <DialogContent class="max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Registration</DialogTitle>
        <DialogDescription>
          Enter your details to sign up
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-4">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <Label for="name" :class="errors.name && 'text-red-500'">Name</Label>
              <Input v-model="name" id="name" placeholder="Your name"
                :class="errors.name && 'focus-visible:ring-red-500 focus:border-red-500 border-red-500'" />
              <span v-if="errors.name" class="text-sm font-semibold text-red-500">{{ errors.name }}</span>
            </div>
            <div>
              <Label for="surname" :class="errors.surname && 'text-red-500'">Surname</Label>
              <Input v-model="surname" id="surname" placeholder="Your surname"
                :class="errors.surname && 'focus-visible:ring-red-500 focus:border-red-500 border-red-500'" />
              <span v-show="errors.surname" class="text-sm font-semibold text-red-500">{{ errors.surname }}</span>
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email" :class="errors.email && 'text-red-500'">Email</Label>
            <Input v-model="email" id="email" type="email" placeholder="m@example.com"
              :class="errors.email && 'focus-visible:ring-red-500 focus:border-red-500 border-red-500'" />
            <span v-show="errors.email" class="text-sm font-semibold text-red-500">{{ errors.email }}</span>
          </div>
          <div class="grid gap-2">
            <Label for="phone" :class="errors.phone && 'text-red-500'">Phone Number</Label>
            <Input v-model="phone" id="phone" type="tel" placeholder="Your phone number" @input="formatPhoneNumber"
              :class="errors.phone && 'focus-visible:ring-red-500 focus:border-red-500 border-red-500'" />
            <span v-show="errors.phone" class="text-sm font-semibold text-red-500">{{ errors.phone }}</span>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password" :class="errors.password && 'text-red-500'">Password</Label>
            </div>
            <Input v-model="password" id="password" type="password"
              :class="errors.password && 'focus-visible:ring-red-500 focus:border-red-500 border-red-500'" />
            <span v-show="errors.password" class="text-sm font-semibold text-red-500">{{ errors.password }}</span>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password_confirmation" :class="errors.password_confirmation && 'text-red-500'">Confirm
                Password</Label>
            </div>
            <Input v-model="password_confirmation" id="password_confirmation" type="password"
              :class="errors.password_confirmation && 'focus-visible:ring-red-500 focus:border-red-500 border-red-500'" />
            <span v-show="errors.password_confirmation" class="text-sm font-semibold text-red-500">{{
              errors.password_confirmation
              }}</span>
          </div>
          <Button type="submit" class="w-full" :disabled="isPending">
            <LoaderCircle v-if="isPending" class="animate-spin" />
            <span v-else>Sign up</span>
          </Button>
          <Button variant="outline" class="w-full">
            Sign up with Google
          </Button>
        </div>
      </form>
      <DialogFooter class="mt-4 sm:justify-center text-sm">
        <div class="text-sm">
          Already have an account?
          <a type="button" @click="showLoginDialog" class="underline cursor-pointer">
            Sign in
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
import { useSignupMutation } from '@/api/authApi';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { usePhoneFormatter } from '@/composables/usePhoneFormatter';
import { useForm, useField } from 'vee-validate';

const authStore = useAuthStore()

const { user } = storeToRefs(useAuthStore())

const { isPending,
  isError,
  error,
  isSuccess,
  mutate } = useSignupMutation()

const loginFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  email: yup.string().required('Email is required').email('Invalid email'),
  phone: yup.string().matches(/^[^a-zA-Z]*$/, "Invalid phone number").required("Phone number is required"),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  password_confirmation: yup.string().required("Confirm Password is required").oneOf([yup.ref("password")], "Passwords must match")
});

const { handleSubmit, errors, validate } = useForm({
  validationSchema: loginFormSchema,
});

const { value: name } = useField('name');
const { value: surname } = useField('surname');
const { value: email } = useField('email');
const { value: phone } = useField('phone');
const { value: password } = useField('password');
const { value: password_confirmation } = useField('password_confirmation');

const { formatPhoneNumber } = usePhoneFormatter(phone)

const onSubmit = handleSubmit(async (values) => {
  try {
    const result = await validate();
    if (!result.valid) return;
    mutate(values);
  } catch (error) {
    console.error('Signup error:', error);
  }
});

const showLoginDialog = () => {
  authStore.handleRegistrationDialog()
  authStore.handleLoginDialog()
}


</script>