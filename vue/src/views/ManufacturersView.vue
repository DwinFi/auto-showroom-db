<template>
  <div>
    <h2>Производители</h2>

    <form class="form" @submit.prevent="saveItem">
      <div class="form-grid">
        <input v-model="form.name" placeholder="Название бренда" required />
        <input v-model="form.country" placeholder="Страна" />
      </div>

      <div class="actions-bar">
        <button type="submit">
          {{ editMode ? "Сохранить изменения" : "Добавить производителя" }}
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
          <th>Страна</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.manufacturerCode">
          <td>{{ item.manufacturerCode }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.country }}</td>
          <td>
            <div class="row-actions">
              <button class="btn-warning" @click="startEdit(item)">Изменить</button>
              <button class="btn-danger" @click="deleteItem(item.manufacturerCode)">Удалить</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Производители пока не добавлены.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "../services/api";

const items = ref([]);
const editMode = ref(false);
const editingId = ref(null);

const emptyForm = () => ({
  name: "",
  country: ""
});

const form = ref(emptyForm());

const loadItems = async () => {
  try {
    const response = await api.get("/manufacturers");
    items.value = response.data;
  } catch {
    alert("Не удалось загрузить производителей");
  }
};

const saveItem = async () => {
  try {
    if (editMode.value) {
      await api.put(`/manufacturers/${editingId.value}`, form.value);
    } else {
      await api.post("/manufacturers", form.value);
    }

    cancelEdit();
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось сохранить производителя");
  }
};

const startEdit = (item) => {
  editMode.value = true;
  editingId.value = item.manufacturerCode;
  form.value = {
    name: item.name ?? "",
    country: item.country ?? ""
  };
};

const cancelEdit = () => {
  editMode.value = false;
  editingId.value = null;
  form.value = emptyForm();
};

const deleteItem = async (id) => {
  if (!confirm("Удалить производителя?")) return;
  try {
    await api.delete(`/manufacturers/${id}`);
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить производителя");
  }
};

const deleteAllItems = async () => {
  alert("Для производителей массовое удаление не реализовано на backend.");
};

onMounted(loadItems);
</script>