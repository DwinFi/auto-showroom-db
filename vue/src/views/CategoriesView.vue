<template>
  <div>
    <h2>Категории</h2>

    <form class="form" @submit.prevent="saveItem">
      <div class="form-grid">
        <input v-model="form.name" placeholder="Название категории" required />
      </div>

      <div class="actions-bar">
        <button type="submit">
          {{ editMode ? "Сохранить изменения" : "Добавить категорию" }}
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
      <button class="btn-danger" @click="deleteAllItems">Удалить все</button>
    </div>

    <table v-if="items.length" class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.categoryCode">
          <td>{{ item.categoryCode }}</td>
          <td>{{ item.name }}</td>
          <td>
            <div class="row-actions">
              <button class="btn-warning" @click="startEdit(item)">Изменить</button>
              <button class="btn-danger" @click="deleteItem(item.categoryCode)">Удалить</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Категории пока не добавлены.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "../services/api";

const items = ref([]);
const editMode = ref(false);
const editingId = ref(null);

const emptyForm = () => ({
  name: ""
});

const form = ref(emptyForm());

const loadItems = async () => {
  try {
    const response = await api.get("/categories");
    items.value = response.data;
  } catch {
    alert("Не удалось загрузить категории");
  }
};

const saveItem = async () => {
  try {
    if (editMode.value) {
      await api.put(`/categories/${editingId.value}`, form.value);
    } else {
      await api.post("/categories", form.value);
    }

    cancelEdit();
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось сохранить категорию");
  }
};

const startEdit = (item) => {
  editMode.value = true;
  editingId.value = item.categoryCode;
  form.value = {
    name: item.name ?? ""
  };
};

const cancelEdit = () => {
  editMode.value = false;
  editingId.value = null;
  form.value = emptyForm();
};

const deleteItem = async (id) => {
  if (!confirm("Удалить категорию?")) return;
  try {
    await api.delete(`/categories/${id}`);
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить категорию");
  }
};

const deleteAllItems = async () => {
  if (!confirm("Удалить все категории?")) return;
  try {
    await api.delete("/categories");
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить все категории");
  }
};

onMounted(loadItems);
</script>