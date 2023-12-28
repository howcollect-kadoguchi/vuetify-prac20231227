<template>
  <v-card>
    <v-layout>
      <task-lists :lists="lists" :onSelect="handleSelectList" />
      <task-items
        :tasks="tasks"
        :onEdit="onEdit"
        :list="
          lists.find((v) => v.id === selectedListId) ?? { title: '', id: '' }
        "
        @setTasks="setTasks"
      />
    </v-layout>
  </v-card>
  <!-- <edit-task-dialog
    :task="currentTask"
    :visibleDialog="visibleDialog"
    @onDialogClose="onDialogClose"
  /> -->
  <v-dialog v-model="visibleDialog">
    <v-card>
      <v-card-title
        >タスクの{{
          editTaskformData.id !== '' ? '編集' : '新規追加'
        }}</v-card-title
      >
      <v-card-text>
        <v-form @submit.prevent="handleSubmitEditTask">
          <v-text-field
            label="title*"
            required
            @input="handleInputChange"
            v-model="editTaskformData.title"
          ></v-text-field>
          <v-textarea
            label="説明"
            required
            @input="handleInputChange"
            v-model="editTaskformData.detail"
          ></v-textarea>
          <v-text-field
            label="期日"
            type="datetime-local"
            required
            @input="handleInputChange"
            v-model="editTaskformData.limit"
          ></v-text-field>
          <v-btn
            type="submit"
            color="primary"
            :disabled="!editTaskformData.formChanged"
            >{{ editTaskformData.id !== '' ? '変更' : '追加' }}</v-btn
          >
          <v-btn color="text" @click="visibleDialog = !visibleDialog"
            >キャンセル</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import VueCookies from 'vue-cookies'
import TaskLists from './TaskLists.vue'
import TaskItems from './TaskItems.vue'
// import EditTaskDialog from './EditTaskDialog.vue'

const cookies = VueCookies

const lists = ref([])
const selectedListId = ref('')

const tasks = ref<
  { id: string; title: string; detail: string; limit: string; done: boolean }[]
>([])

onMounted(async () => {
  await fetchLists()
  await fetchTasks()
})

const handleSelectList = (id?: string) => {
  if (!id) {
  } else {
    selectedListId.value = id
    fetchTasks()
  }
}

const fetchLists = async () => {
  const url = import.meta.env.VITE_BASE_URL + '/lists'
  await axios
    .get(url, {
      headers: {
        authorization: `Bearer ${cookies.get('todo_token')}`,
      },
    })
    .then((res) => {
      lists.value = res.data
      if (res.data.length > 0) {
        selectedListId.value = res.data[0].id
      }
    })
    .catch((err) => {
      console.error(err)
      // setErrorMessage(`リストの取得に失敗しました。${err}`)
    })
}

const fetchTasks = async () => {
  const listId = selectedListId.value
  if (typeof listId !== 'undefined') {
    const url = `${import.meta.env.VITE_BASE_URL}/lists/${listId}/tasks`
    axios
      .get(url, {
        headers: {
          authorization: `Bearer ${cookies.get('todo_token')}`,
        },
      })
      .then((res) => {
        tasks.value = res.data.tasks
        // setTasks(res.data.tasks)
      })
      .catch((err) => {
        console.error(err)
        // setErrorMessage(`タスクの取得に失敗しました。${err}`)
      })
  }
}

const visibleDialog = ref(false)

const onEdit = (id?: string) => {
  const currentPreTask = tasks.value.find((v) => v.id === id)

  if (!currentPreTask) {
    // ============= 新規モード
    editTaskformData.value.id = ''
    editTaskformData.value.title = ''
    editTaskformData.value.detail = ''
    editTaskformData.value.done = false
    editTaskformData.value.limit = ''
    editTaskformData.value.formChanged = false
    visibleDialog.value = true
  } else {
    // ============= 既存モード
    editTaskformData.value.id = currentPreTask.id
    editTaskformData.value.title = currentPreTask.title
    editTaskformData.value.detail = currentPreTask.detail
    editTaskformData.value.done = currentPreTask.done
    const date = new Date(currentPreTask.limit)
    const str = toISOStringWithTimezone(date)
    console.log(currentPreTask.limit, date, str)
    editTaskformData.value.limit = str.substring(0, 16)

    editTaskformData.value.formChanged = false
    visibleDialog.value = true
  }
}

// JSTのISO 8601表現にする関数（引数: date: Date型）
function toISOStringWithTimezone(date: Date) {
  const pad = function (str: string) {
    return ('0' + str).slice(-2)
  }
  const year = date.getFullYear().toString()
  const month = pad((date.getMonth() + 1).toString())
  const day = pad(date.getDate().toString())
  const hour = pad(date.getHours().toString())
  const min = pad(date.getMinutes().toString())
  const sec = pad(date.getSeconds().toString())
  const tz = -date.getTimezoneOffset()
  const sign = tz >= 0 ? '+' : '-'
  const tzHour = pad((tz / 60).toString())
  const tzMin = pad((tz % 60).toString())

  return `${year}-${month}-${day}T${hour}:${min}:${sec}${sign}${tzHour}:${tzMin}`
}

const editTaskformData = ref({
  title: '',
  detail: '',
  formChanged: false,
  done: false,
  limit: '',
  id: '',
})

// EditUserNameのイベント
const handleInputChange = (e) => {
  editTaskformData.value.formChanged = true
}

const handleSubmitEditTask = async () => {
  const isNew = editTaskformData.value.id === ''
  const url =
    `${import.meta.env.VITE_BASE_URL}/lists/${selectedListId.value}/tasks` +
    (!isNew ? `/${editTaskformData.value.id}` : '')

  const headers = {
    authorization: `Bearer ${cookies.get('todo_token')}`,
  }

  const strLimit =
    editTaskformData.value.limit !== ''
      ? new Date(editTaskformData.value.limit).toISOString()
      : ''

  const data = {
    title: editTaskformData.value.title,
    detail: editTaskformData.value.detail,
    done: editTaskformData.value.done,
    limit: strLimit,
  }

  if (isNew) {
    await axios
      .post(url, data, { headers })
      .then((res) => {
        const resData = res.data
        const resData2 = {
          id: resData.id,
          title: resData.title,
          detail: resData.detail,
          done: resData.done,
          limit: resData.limit,
        }
        tasks.value.unshift(resData2)
        // tasks.value = data
        visibleDialog.value = false
      })
      .catch((err) => {
        console.error(err)
        // setErrorMessage(`タスクの取得に失敗しました。${err}`)
      })
  } else {
    await axios
      .put(url, data, { headers })
      .then((res) => {
        const resData = res.data
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
        tasks.value = data
        visibleDialog.value = false
      })
      .catch((err) => {
        console.error(err)
        // setErrorMessage(`タスクの取得に失敗しました。${err}`)
      })
  }
}

const setTasks = (
  newTasks: {
    id: string
    title: string
    detail: string
    limit: string
    done: boolean
  }[],
) => {
  tasks.value = newTasks
}
</script>
