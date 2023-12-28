<template>
  <v-navigation-drawer class="bg-deep-purple pa-2" theme="dark" permanent>
    <h3>リスト</h3>
    <v-btn
      v-for="list in lists"
      :key="list.id"
      variant="text"
      block
      append-icon="mdi-dots-vertical"
      @click="onSelect(list.id)"
    >
      {{ list.title }}
    </v-btn>
    <v-btn variant="text" block prepend-icon="mdi-plus" @click="onSelect"
      >リストの追加</v-btn
    >

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  lists: {
    type: Array as () => { title: string; id: string }[],
    required: true,
  },
  onSelect: {
    type: Function,
    required: true,
  },
})

const { lists, onSelect } = toRefs(props)
</script>
