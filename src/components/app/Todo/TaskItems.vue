<!-- TaskList.vue -->
<template>
  <v-main style="min-height: 100vh">
    <h2>
      {{ list.title }}
      <v-btn prepend-icon="mdi-plus" color="primary" @click="onEdit"
        >新規
      </v-btn>
    </h2>
    <v-container>
      <v-row>
        <v-col
          v-for="(task, index) in tasks"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card>
            <!-- カードの内容 -->
            <v-card-title>{{ task.title }}</v-card-title>
            <v-card-subtitle>{{ task.detail }}</v-card-subtitle>
            <v-card-text>
              <p>期限：{{ diff(task).text }}</p>
              <p v-if="!task.done">
                <span :style="diff(task).timeDiff >= 0 ? '' : 'color: red'">
                  {{ diff(task).textLimit }}
                </span>
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                prepend-icon="mdi-pencil"
                variant="outlined"
                @click="onEdit(task.id)"
                >編集</v-btn
              >
              <v-btn
                :prepend-icon="task.done ? '' : 'mdi-check'"
                :variant="task.done ? 'outlined' : 'elevated'"
                color="success"
                @click="handleSubmitEditTask(task.id)"
                >{{ task.done ? '取り消す' : '完了する' }}</v-btn
              >
              <v-btn
                prepend-icon="mdi-delete"
                color="red"
                @click="handleDelete(task.id)"
                >削除</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'

const cookies = VueCookies

const props = defineProps({
  list: {
    type: Object as () => { title: string; id: string },
    required: true,
  },
  tasks: {
    type: Array as () => {
      id: string
      title: string
      detail: string
      limit: string
      done: boolean
    }[],
    required: true,
  },
  onEdit: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['setTasks'])

// const { emit } = defineEmits({
//   setTasks: {
//     type: Function as (
//       tasks: {
//         id: string
//         title: string
//         detail: string
//         limit: string
//         done: boolean
//       }[],
//     ) => void,
//     required: true,
//   },
// })

const { tasks, list, onEdit } = toRefs(props)

const diff = (task: {
  id: string
  title: string
  detail: string
  limit: string
  done: boolean
}) => {
  const pad = function (str: string) {
    return ('0' + str).slice(-2)
  }
  const date = new Date(task.limit)
  // 表示用
  const year = date.getFullYear().toString()
  const month = pad((date.getMonth() + 1).toString())
  const day = pad(date.getDate().toString())
  const hour = pad(date.getHours().toString())
  const min = pad(date.getMinutes().toString())
  const text = `${year}年${month}月${day}日 ${hour}:${min}`

  // 現在時刻を取得
  const currentDate = new Date()

  // 差分を取得

  const timeDiff = Math.ceil((date - currentDate) / (1000 * 60))
  const resDiff = timeDiff < 0 ? -timeDiff : timeDiff

  // 残りの日数、時間、分を計算
  const daysDiff = Math.floor(resDiff / (60 * 24))
  const hoursDiff = Math.floor((resDiff % (60 * 24)) / 60)
  const minDiff = Math.floor(resDiff % 60)

  // 残り時間のテキストを格納
  const textLimit =
    timeDiff >= 0
      ? `残り${daysDiff}日${hoursDiff}時間${minDiff}分`
      : `${Math.abs(daysDiff)}日${Math.abs(hoursDiff)}時間${Math.abs(
          minDiff,
        )}分 遅れ`
  return { text, textLimit, timeDiff }
}

const handleSubmitEditTask = async (taskId: string) => {
  const currentTask = tasks.value.find((v) => v.id === taskId)

  if (!currentTask) return

  const url = `${import.meta.env.VITE_BASE_URL}/lists/${
    list.value.id
  }/tasks/${taskId}`

  const headers = {
    authorization: `Bearer ${cookies.get('todo_token')}`,
  }

  const strLimit =
    currentTask.limit !== '' ? new Date(currentTask.limit).toISOString() : ''

  const data = {
    title: currentTask.title,
    detail: currentTask.detail,
    done: !currentTask.done, // 反転
    limit: strLimit,
  }

  await axios
    .put(url, data, { headers })
    .then((res) => {
      const resData = res.data
      console.log(resData)
      const data = tasks.value.map((v) => {
        if (v.id !== resData.id) return v
        return {
          id: resData.id,
          title: resData.title,
          detail: resData.detail,
          done: resData.done,
          limit: resData.limit,
        }
      })

      console.log(data)

      emit('setTasks', data)
    })
    .catch((err) => {
      console.error(err)
      // setErrorMessage(`タスクの取得に失敗しました。${err}`)
    })
}

const handleDelete = async (taskId: string) => {
  const currentTask = tasks.value.find((v) => v.id === taskId)

  if (!currentTask || !confirm('本当に削除してよろしいですか？')) return

  const url = `${import.meta.env.VITE_BASE_URL}/lists/${
    list.value.id
  }/tasks/${taskId}`

  const headers = {
    authorization: `Bearer ${cookies.get('todo_token')}`,
  }

  await axios
    .delete(url, { headers })
    .then(() => {
      const data = tasks.value.filter((v) => v.id !== currentTask.id)
      emit('setTasks', data)
    })
    .catch((err) => {
      console.error(err)
      // setErrorMessage(`タスクの取得に失敗しました。${err}`)
    })
}
</script>
