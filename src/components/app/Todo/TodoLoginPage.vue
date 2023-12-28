<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card-title class="text-h6">ログイン画面</v-card-title>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const email = ref('')
const password = ref('')

const login = async () => {
  const url = import.meta.env.VITE_BASE_URL + '/signin'

  try {
    const res = await axios.post(url, {
      email: email.value,
      password: password.value,
    })
    const token = await res.data.token
    store.dispatch('login', token)
    router.push('/todo')
  } catch (e) {
    console.error(e)
  }
}
</script>
