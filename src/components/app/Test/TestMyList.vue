<template>
  <v-card>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :subtitle="item.value"
        prepend-avatar="https://randomuser.me/api/portraits/women/8.jpg"
      >
      </v-list-item>
    </v-list>
  </v-card>

  <v-card>
    <v-card-text>
      list表示はlist単体でできます。itemsにグループなどの記述もすることで自動的にリストが作成できます。
    </v-card-text>
    <v-list
      :items="items"
      item-title="title"
      item-value="id"
      item-children="value"
    ></v-list>
  </v-card>
  <v-card>
    <v-list :items="items" item-title="title" item-value="id"></v-list>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { type: 'subheader', title: 'Group #1' },
  {
    id: 1,
    title: 'テストタイトル',
    value:
      'こんにちは今回はタイピング練習をしていこうと思いますそれでは本日も行ってみましょう',
    props: {
      prependIcon: 'mdi-home',
    },
  },
  {
    id: 2,
    title: 'テストタイトル',
    value:
      'こんにちは今回はタイピング練習をしていこうと思いますそれでは本日も行ってみましょう',
    props: {
      appendIcon: 'mdi-close',
    },
  },
  { type: 'divider' },
  { type: 'subheader', title: 'Group #2' },
  {
    id: 3,
    title: 'テストタイトル',
    value:
      'こんにちは今回はタイピング練習をしていこうと思いますそれでは本日も行ってみましょう',
    props: {
      color: 'primary',
    },
  },
  {
    id: 4,
    title: 'テストタイトル',
    value:
      'こんにちは今回はタイピング練習をしていこうと思いますそれでは本日も行ってみましょう',
  },
])
</script>
