<template>
  <v-card>
    <v-card-title> Card タイトル{{ text }} </v-card-title>
    <v-card-subtitle>Card サブタイトル</v-card-subtitle>
    <!-- <v-card-media src="/images/favicon.ico" height="200px"></v-card-media> -->
    <v-card-text
      >こんにちは今回はタイピング練習をしていこうと思いますそれでは本日も行ってみましょう。</v-card-text
    >
    <v-card-actions>
      <v-btn variant="tonal" link>OK</v-btn>
      <v-btn variant="text" link>Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
export default {
  props: ['text'],
}
</script>
