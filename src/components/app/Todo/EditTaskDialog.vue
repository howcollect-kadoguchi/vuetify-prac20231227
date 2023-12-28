<template>
  <v-dialog v-model="visibleDialog">
    <v-card>
      <v-card-title>タスクの編集</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmitEditTask">
          <!-- 編集フォームの内容 -->
          <v-text-field
            label="title*"
            required
            @input="handleInputChange"
            v-model="formData.title"
          ></v-text-field>
          <v-textarea
            label="説明"
            required
            @input="handleInputChange"
            v-model="formData.detail"
          ></v-textarea>
          <v-btn type="submit" color="primary" :disabled="!formData.formChanged"
            >変更</v-btn
          >
          <v-btn color="text" @click="onDialogClose">キャンセル</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'

const props = defineProps({
  task: {
    type: Object as () => {
      id: string
      title: string
      detail: string
      limit: string
      done: boolean
    },
    required: true,
  },
  visibleDialog: {
    type: Boolean,
    required: true,
  },
  onDialogClose: {
    type: Function,
    required: true,
  },
})

const { task, visibleDialog, onDialogClose } = toRefs(props)

const formData = ref({ ...task.value, formChanged: false })

console.log(formData)

const handleInputChange = () => {
  // formData.value.formChanged = true
}

// Submit時の処理
const handleSubmitEditTask = () => {}
</script>
