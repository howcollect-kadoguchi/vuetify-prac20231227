<template>
  <v-app>
    <todo-app-bar />

    <todo-view />
  </v-app>
</template>

<script lang="ts" setup>
import TodoAppBar from './TodoAppBar.vue'
import TodoView from './TodoView.vue'
</script>
