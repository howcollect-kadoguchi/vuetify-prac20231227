<template>
  <v-row justify="center">
    <v-dialog v-model="editUserNamedialogModel">
      <!-- <edit-user-name-card
        :init-user-name="userName"
        @child-closed="editUserNamedialogModel = !editUserNamedialogModel"
      /> -->
      <v-card>
        <v-card-title>ユーザ名の変更</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              label="name*"
              required
              @input="handleInputChange"
              v-model="formData.name"
            ></v-text-field>
            <v-btn
              type="submit"
              color="primary"
              :disabled="!formData.formChanged"
              >変更</v-btn
            >
            <v-btn
              color="text"
              @click="editUserNamedialogModel = !editUserNamedialogModel"
              >キャンセル</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
  <v-app-bar color="primary">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>
      <v-btn to="/" variant="text" link style="font-size: 30px"> Todo </v-btn>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          <v-avatar>
            <v-icon>mdi-account</v-icon>
          </v-avatar>
          <span style="color: white">{{ userName }}</span>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-btn
            text
            @click="editUserNamedialogModel = !editUserNamedialogModel"
          >
            <v-list-item-title>名前の変更</v-list-item-title>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text @click="logout">
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import VueCookies from 'vue-cookies'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const store = useStore()
const cookies = VueCookies
const editUserNamedialogModel = ref(false)
const router = useRouter()

const userName = ref('')

const formData = ref({ name: '', formChanged: false })

onMounted(async () => {
  // computedを使用してstateやgettersを取得します
  const isLoggedIn = store.getters.isLoggedIn

  if (isLoggedIn) {
    const url = import.meta.env.VITE_BASE_URL + '/users'

    try {
      const headers = {
        Authorization: `Bearer ${cookies.get('todo_token')}`,
      }
      const res = await axios.get(url, { headers })
      userName.value = await res.data.name
      formData.value.name = await res.data.name
    } catch (e) {
      console.error(e)
    }
  }
})

const handleInputChange = (e) => {
  formData.value.formChanged = e.target.value !== userName.value
}
const login = async () => {
  const url = import.meta.env.VITE_BASE_URL + '/users'

  try {
    const headers = {
      Authorization: `Bearer ${cookies.get('todo_token')}`,
    }

    const data = { name: formData.value.name }

    const res = await axios.put(url, data, { headers })
    userName.value = await res.data.name
    formData.value.name = await res.data.name
    editUserNamedialogModel.value = !editUserNamedialogModel.value
  } catch (e) {
    console.error(e)
  }
}

const logout = () => {
  store.dispatch('logout')
  router.push('/todo/login')
}
</script>
