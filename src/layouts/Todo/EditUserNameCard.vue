<!-- <template>
  <v-card>
    <v-card-title>
      <span class="text-h5">ユーザ名の変更</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="name*"
              required
              v-model="userName"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-card-text>最初の名前以外はダミーです</v-card-text>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Legal middle name"
              hint="example of helper text only on focus"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Legal last name"
              hint="example of persistent helper text"
              persistent-hint
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Email"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Password" type="password"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Age"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              :items="[
                'Skiing',
                'Ice hockey',
                'Soccer',
                'Basketball',
                'Hockey',
                'Reading',
                'Writing',
                'Coding',
                'Basejump',
              ]"
              label="Interests"
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="handleClose">
        Close
      </v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="handleClose">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// // propsのデストラクチャリング
const props = defineProps(['init-user-name'])

const userName = ref(props['init-user-name'])

console.log(userName.value)

const handleClose = () => {
  emit('child-closed')
}
// // // watchEffectを使用してローカルなデータが変更されたときに親に通知
// // watchEffect(() => {
// //   // v-modelで受け取ったデータが変更されたら、ローカルなデータも更新
// //   localData.value = value;

// //   // ローカルなデータが変更されたら、親に通知
// //   emit('update:value', localData.value);
// });
</script> -->
