<template>
  <TodoHomePage />
</template>

<script setup lang="ts">
import TodoHomePage from '@/components/app/Todo/TodoHomePage.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

// computedを使用してstateやgettersを取得します
const isLoggedIn = store.getters.isLoggedIn

if (!isLoggedIn) router.push('/todo/login')
</script>
