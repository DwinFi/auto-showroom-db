<template>
  <div>
    <h2>Клиенты</h2>

    <form class="form" @submit.prevent="saveItem">
      <div class="form-grid">
        <input v-model="form.fullName" placeholder="ФИО" required />
        <input v-model="form.phone" placeholder="Телефон" required />
        <input v-model="form.passportData" placeholder="Паспортные данные" />
      </div>

      <div class="actions-bar">
        <button type="submit">
          {{ editMode ? "Сохранить изменения" : "Добавить клиента" }}
        </button>
        <button
          v-if="editMode"
          type="button"
          class="btn-secondary"
          @click="cancelEdit"
        >
          Отменить редактирование
        </button>
      </div>
    </form>

    <div class="actions-bar">
      <button @click="loadItems">Обновить список</button>
      <button class="btn-danger" @click="deleteAllItems">Удалить всех</button>
    </div>

    <table v-if="items.length" class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ФИО</th>
          <th>Телефон</th>
          <th>Паспортные данные</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.clientCode">
          <td>{{ item.clientCode }}</td>
          <td>{{ item.fullName }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.passportData }}</td>
          <td>
            <div class="row-actions">
              <button class="btn-warning" @click="startEdit(item)">Изменить</button>
              <button class="btn-danger" @click="deleteItem(item.clientCode)">Удалить</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Клиенты пока не добавлены.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "../services/api";

const items = ref([]);
const editMode = ref(false);
const editingId = ref(null);

const emptyForm = () => ({
  fullName: "",
  phone: "",
  passportData: ""
});

const form = ref(emptyForm());

const loadItems = async () => {
  try {
    const response = await api.get("/clients");
    items.value = response.data;
  } catch {
    alert("Не удалось загрузить клиентов");
  }
};

const saveItem = async () => {
  try {
    if (editMode.value) {
      await api.put(`/clients/${editingId.value}`, form.value);
    } else {
      await api.post("/clients", form.value);
    }

    cancelEdit();
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось сохранить клиента");
  }
};

const startEdit = (item) => {
  editMode.value = true;
  editingId.value = item.clientCode;
  form.value = {
    fullName: item.fullName ?? "",
    phone: item.phone ?? "",
    passportData: item.passportData ?? ""
  };
};

const cancelEdit = () => {
  editMode.value = false;
  editingId.value = null;
  form.value = emptyForm();
};

const deleteItem = async (id) => {
  if (!confirm("Удалить клиента?")) return;
  try {
    await api.delete(`/clients/${id}`);
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить клиента");
  }
};

const deleteAllItems = async () => {
  if (!confirm("Удалить всех клиентов?")) return;
  try {
    await api.delete("/clients");
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить всех клиентов");
  }
};

onMounted(loadItems);
</script>