<template>
  <div>
    <h2>Мотоциклы</h2>

    <form class="form" @submit.prevent="saveItem">
      <div class="form-grid">
        <input v-model="form.vin" placeholder="VIN" required />
        <input v-model="form.model" placeholder="Модель" required />
        <input v-model.number="form.year" placeholder="Год выпуска" required type="number" />
        <input v-model="form.color" placeholder="Цвет" required />
        <input v-model="form.condition" placeholder="Состояние" required />
        <input v-model.number="form.purchasePrice" placeholder="Цена закупки" required type="number" />
        <input v-model.number="form.engine_capacity" placeholder="Объём двигателя" required type="number" />
        <input v-model.number="form.categoryCode" placeholder="ID категории" required type="number" />
        <input v-model.number="form.manufacturerCode" placeholder="ID производителя" required type="number" />
      </div>

      <div class="actions-bar">
        <button type="submit">
          {{ editMode ? "Сохранить изменения" : "Добавить мотоцикл" }}
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
          <th>VIN</th>
          <th>Бренд</th>
          <th>Модель</th>
          <th>Год</th>
          <th>Цвет</th>
          <th>Состояние</th>
          <th>Цена</th>
          <th>Объём</th>
          <th>ID категории</th>
          <th>ID производителя</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.motorcycleCode">
          <td>{{ item.motorcycleCode }}</td>
          <td>{{ item.vin }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.model }}</td>
          <td>{{ item.year }}</td>
          <td>{{ item.color }}</td>
          <td>{{ item.condition }}</td>
          <td>{{ item.purchasePrice }}</td>
          <td>{{ item.engine_capacity }}</td>
          <td>{{ item.categoryCode }}</td>
          <td>{{ item.manufacturerCode }}</td>
          <td>
            <div class="row-actions">
              <button class="btn-warning" @click="startEdit(item)">Изменить</button>
              <button class="btn-danger" @click="deleteItem(item.motorcycleCode)">Удалить</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Мотоциклы пока не добавлены.</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "../services/api";

const items = ref([]);
const editMode = ref(false);
const editingId = ref(null);

const emptyForm = () => ({
  vin: "",
  model: "",
  year: null,
  color: "",
  condition: "",
  purchasePrice: null,
  engine_capacity: null,
  categoryCode: null,
  manufacturerCode: null
});

const form = ref(emptyForm());

const loadItems = async () => {
  try {
    const response = await api.get("/motorcycles");
    items.value = response.data;
  } catch {
    alert("Не удалось загрузить мотоциклы");
  }
};

const saveItem = async () => {
  try {
    if (editMode.value) {
      await api.put(`/motorcycles/${editingId.value}`, form.value);
    } else {
      await api.post("/motorcycles", form.value);
    }

    cancelEdit();
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось сохранить мотоцикл");
  }
};

const startEdit = (item) => {
  editMode.value = true;
  editingId.value = item.motorcycleCode;
  form.value = {
    vin: item.vin ?? "",
    model: item.model ?? "",
    year: item.year ?? null,
    color: item.color ?? "",
    condition: item.condition ?? "",
    purchasePrice: item.purchasePrice ?? null,
    engine_capacity: item.engine_capacity ?? null,
    categoryCode: item.categoryCode ?? null,
    manufacturerCode: item.manufacturerCode ?? null
  };
};

const cancelEdit = () => {
  editMode.value = false;
  editingId.value = null;
  form.value = emptyForm();
};

const deleteItem = async (id) => {
  if (!confirm("Удалить мотоцикл?")) return;
  try {
    await api.delete(`/motorcycles/${id}`);
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить мотоцикл");
  }
};

const deleteAllItems = async () => {
  if (!confirm("Удалить все мотоциклы?")) return;
  try {
    await api.delete("/motorcycles");
    await loadItems();
  } catch (error) {
    alert(error?.response?.data?.message || "Не удалось удалить все мотоциклы");
  }
};

onMounted(loadItems);
</script>