<template>
  <div>
    <h2>Менеджеры</h2>

    <form class="form" @submit.prevent="saveItem">
      <div class="form-grid">
        <input v-model="form.fullName" placeholder="ФИО" required />
        <input v-model="form.phone" placeholder="Телефон" required />
      </div>

      <div class="actions-bar">
        <button type="submit">
          {{ editMode ? "Сохранить изменения" : "Добавить менеджера" }}
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
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.managerCode">
          <td>{{ item.managerCode }}</td>
          <td>{{ item.fullName }}</td>
          <td>{{ item.phone }}</td>
          <td>
            <div class="row-actions">
              <button class="btn-warning" @click="startEdit(item)">Изменить</button>
              <button class="btn-danger" @click="deleteItem(item.managerCode)">Удалить</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Менеджеры пока не добавлены.</p>
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
  phone: ""
});

const form = ref(emptyForm());

const loadItems = async () => {
  try {
    const response = await api.get("/managers");
    items.value = response.data;
  } catch {
    alert("Не удалось загрузить менеджеров");
  }
};

const saveItem = async () => {
  try {
    if (editMode.value) {
      await api.put(`/managers/${editingId.value}`, form.value);
    } else {
      await api.post("/managers", form.value);
    }

    cancelEdit();
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось сохранить менеджера");
  }
};

const startEdit = (item) => {
  editMode.value = true;
  editingId.value = item.managerCode;
  form.value = {
    fullName: item.fullName ?? "",
    phone: item.phone ?? ""
  };
};

const cancelEdit = () => {
  editMode.value = false;
  editingId.value = null;
  form.value = emptyForm();
};

const deleteItem = async (id) => {
  if (!confirm("Удалить менеджера?")) return;
  try {
    await api.delete(`/managers/${id}`);
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить менеджера");
  }
};

const deleteAllItems = async () => {
  if (!confirm("Удалить всех менеджеров?")) return;
  try {
    await api.delete("/managers");
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить всех менеджеров");
  }
};

onMounted(loadItems);
</script>