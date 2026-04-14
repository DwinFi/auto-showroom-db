<template>
  <div>
    <h2>Позиции заказа</h2>

    <form class="form" @submit.prevent="saveItem">
      <div class="form-grid">
        <input v-model.number="form.salePrice" placeholder="Цена продажи" required type="number" />
        <input v-model.number="form.orderNumber" placeholder="ID заказа" required type="number" />
        <input v-model.number="form.motorcycleCode" placeholder="ID мотоцикла" required type="number" />
      </div>

      <div class="actions-bar">
        <button type="submit">
          {{ editMode ? "Сохранить изменения" : "Добавить позицию" }}
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
          <th>Цена продажи</th>
          <th>ID заказа</th>
          <th>ID мотоцикла</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.salePrice }}</td>
          <td>{{ item.orderNumber }}</td>
          <td>{{ item.motorcycleCode }}</td>
          <td>
            <div class="row-actions">
              <button class="btn-warning" @click="startEdit(item)">Изменить</button>
              <button class="btn-danger" @click="deleteItem(item.id)">Удалить</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Позиции заказа пока не добавлены.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "../services/api";

const items = ref([]);
const editMode = ref(false);
const editingId = ref(null);

const emptyForm = () => ({
  salePrice: null,
  orderNumber: null,
  motorcycleCode: null
});

const form = ref(emptyForm());

const loadItems = async () => {
  try {
    const response = await api.get("/orderitems");
    items.value = response.data;
  } catch {
    alert("Не удалось загрузить позиции заказа");
  }
};

const saveItem = async () => {
  try {
    if (editMode.value) {
      await api.put(`/orderitems/${editingId.value}`, form.value);
    } else {
      await api.post("/orderitems", form.value);
    }

    cancelEdit();
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось сохранить позицию заказа");
  }
};

const startEdit = (item) => {
  editMode.value = true;
  editingId.value = item.id;
  form.value = {
    salePrice: item.salePrice ?? null,
    orderNumber: item.orderNumber ?? null,
    motorcycleCode: item.motorcycleCode ?? null
  };
};

const cancelEdit = () => {
  editMode.value = false;
  editingId.value = null;
  form.value = emptyForm();
};

const deleteItem = async (id) => {
  if (!confirm("Удалить позицию заказа?")) return;
  try {
    await api.delete(`/orderitems/${id}`);
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить позицию заказа");
  }
};

const deleteAllItems = async () => {
  if (!confirm("Удалить все позиции заказа?")) return;
  try {
    await api.delete("/orderitems");
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить все позиции заказа");
  }
};

onMounted(loadItems);
</script>