<template>
  <p>あああ</p>

  <v-container>
    <v-row>
      <v-col>
        <TestMyCard :text="'aa'" />
      </v-col>
      <v-col>
        <TestMyCard />
      </v-col>
      <v-col>
        <TestMyCard />
      </v-col>
    </v-row>
  </v-container>
  <v-divider></v-divider>
  <TestMyList />
  <!-- <v-container> aaa </v-container> -->
</template>

<script lang="ts" setup>
import TestMyCard from '@/components/app/Test/TestMyCard.vue'
import TestMyList from '@/components/app/Test/TestMyList.vue'
</script>
