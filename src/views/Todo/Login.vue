<template>
  <todo-login-page />
</template>

<script setup lang="ts">
import TodoLoginPage from '@/components/Todo/TodoLoginPage.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const isLoggedIn = store.getters.isLoggedIn

if (isLoggedIn) router.push('/todo')
</script>
