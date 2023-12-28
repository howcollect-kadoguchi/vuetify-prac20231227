<!-- <template>
  <v-card>
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
                    @click="openEditTask(task.id)"
                    >編集</v-btn
                  >
                  <v-btn
                    :prepend-icon="task.done ? '' : 'mdi-check'"
                    :variant="task.done ? 'outlined' : 'elevated'"
                    color="success"
                    >{{ task.done ? '取り消す' : '完了する' }}</v-btn
                  >
                  <v-btn prepend-icon="mdi-delete" color="red">削除</v-btn>
                </v-card-actions>
              </v-card>
</template> -->
