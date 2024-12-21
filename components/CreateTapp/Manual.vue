<script setup lang="ts">
import type Tapp from "../../types/tapp.interface"
import type Button from "../../types/tapp.button.interface"

let form = ref<Tapp>({
  name: "",
  logoLink: "",
  buttons: [],
})

let addButtonDialog = ref<boolean>(false)
let editButtonDialog = ref<boolean>(false)
let buttonToEdit = ref<Button>(null)
let buttonIndexToEdit = -1

function addButton(newButton: Button) {
  form.value.buttons.push(newButton)
  addButtonDialog.value = false
}

function startEditButton(index: number) {
  buttonIndexToEdit = index;
  buttonToEdit.value = form.value.buttons[index];
  editButtonDialog.value = true;
}

function clearEdit() {
  buttonIndexToEdit = -1;
  buttonToEdit.value = null;
}

function editButton(editedButton: Button) {
  form.value.buttons[buttonIndexToEdit].name = editedButton.name;
  form.value.buttons[buttonIndexToEdit].link = editedButton.link;

  editButtonDialog.value = false;
  clearEdit()
}

function closeEdit() {
  editButtonDialog.value = false;
  clearEdit()
}
</script>
<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-col cols="12">
        <h2>Название</h2>
        <v-text-field v-model="form.name" variant="outlined"></v-text-field>
      </v-col>
      <v-col cols="12">
        <h2>Ссылка на логотип</h2>
        <v-text-field v-model="form.logoLink" variant="outlined"></v-text-field>
      </v-col>
      <v-col cols="12">
        <h2 class="mb-5">Кнопки</h2>
        <v-row>
          <v-col cols="12" class="d-flex" v-for="(btn, index) of form.buttons" :key="index">
            <div>
              Надпись: <b>{{ btn.name }}</b> <br />
              Ссылка:
              <a :href="btn.link" target="_blank"
                ><b>{{ btn.link }}</b></a
              >
            </div>
            <div class="ml-6">
              <v-btn class="default-btn" variant="tonal" prepend-icon="mdi-pencil" @click="startEditButton(index)"
                >Редактировать</v-btn
              >
            </div>
          </v-col>
        </v-row>

        <v-btn class="default-btn mt-6" variant="tonal" prepend-icon="mdi-plus" @click="addButtonDialog = true"
          >Создать кнопку</v-btn
        >
      </v-col>
    </v-col>

    <v-col cols="12" md="6" class="d-flex justify-center align-start">
      <TappPreview :data="form" />
    </v-col>

    <v-dialog v-model="addButtonDialog" max-width="600">
      <CreateTappButton @close="addButtonDialog = false" @add-button="addButton" />
    </v-dialog>

    <v-dialog v-model="editButtonDialog" max-width="600">
      <CreateTappEditButton :data="buttonToEdit" @edit-button="editButton" @close="closeEdit" />
    </v-dialog>
  </v-row>
</template>
