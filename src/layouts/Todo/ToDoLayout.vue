<template>
  <v-app>
    <todo-app-bar />

    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import TodoAppBar from './TodoAppBar.vue'
import DefaultView from '../default/View.vue'
</script>
