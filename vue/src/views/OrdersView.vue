<template>
  <div>
    <h2>Заказы</h2>

    <form class="form" @submit.prevent="saveItem">
      <div class="form-grid">
        <input v-model="form.orderDate" type="date" required />
        <input v-model="form.status" placeholder="Статус" required />
        <input v-model.number="form.clientCode" placeholder="ID клиента" required type="number" />
        <input v-model.number="form.managerCode" placeholder="ID менеджера" required type="number" />
      </div>

      <div class="actions-bar">
        <button type="submit">
          {{ editMode ? "Сохранить изменения" : "Добавить заказ" }}
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
          <th>Дата</th>
          <th>Статус</th>
          <th>ID клиента</th>
          <th>ID менеджера</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.orderNumber">
          <td>{{ item.orderNumber }}</td>
          <td>{{ item.orderDate }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.clientCode }}</td>
          <td>{{ item.managerCode }}</td>
          <td>
            <div class="row-actions">
              <button class="btn-warning" @click="startEdit(item)">Изменить</button>
              <button class="btn-danger" @click="deleteItem(item.orderNumber)">Удалить</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Заказы пока не добавлены.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "../services/api";

const items = ref([]);
const editMode = ref(false);
const editingId = ref(null);

const emptyForm = () => ({
  orderDate: "",
  status: "",
  clientCode: null,
  managerCode: null
});

const form = ref(emptyForm());

const loadItems = async () => {
  try {
    const response = await api.get("/orders");
    items.value = response.data;
  } catch {
    alert("Не удалось загрузить заказы");
  }
};

const saveItem = async () => {
  try {
    if (editMode.value) {
      await api.put(`/orders/${editingId.value}`, form.value);
    } else {
      await api.post("/orders", form.value);
    }

    cancelEdit();
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось сохранить заказ");
  }
};

const startEdit = (item) => {
  editMode.value = true;
  editingId.value = item.orderNumber;
  form.value = {
    orderDate: item.orderDate ? String(item.orderDate).slice(0, 10) : "",
    status: item.status ?? "",
    clientCode: item.clientCode ?? null,
    managerCode: item.managerCode ?? null
  };
};

const cancelEdit = () => {
  editMode.value = false;
  editingId.value = null;
  form.value = emptyForm();
};

const deleteItem = async (id) => {
  if (!confirm("Удалить заказ?")) return;
  try {
    await api.delete(`/orders/${id}`);
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить заказ");
  }
};

const deleteAllItems = async () => {
  if (!confirm("Удалить все заказы?")) return;
  try {
    await api.delete("/orders");
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить все заказы");
  }
};

onMounted(loadItems);
</script>