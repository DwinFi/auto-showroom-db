<template>
  <div>
    <h2>Главное меню</h2>
    <p>Выберите раздел для работы с базой данных мотосалона.</p>

    <div class="cards">
      <RouterLink class="card" to="/motorcycles">
        <h3>Мотоциклы</h3>
        <p>Просмотр и добавление мотоциклов</p>
      </RouterLink>

      <RouterLink class="card" to="/manufacturers">
        <h3>Производители</h3>
        <p>Работа с производителями</p>
      </RouterLink>

      <RouterLink class="card" to="/categories">
        <h3>Категории</h3>
        <p>Работа с категориями</p>
      </RouterLink>

      <RouterLink class="card" to="/clients">
        <h3>Клиенты</h3>
        <p>Работа с клиентами</p>
      </RouterLink>

      <RouterLink class="card" to="/managers">
        <h3>Менеджеры</h3>
        <p>Работа с менеджерами</p>
      </RouterLink>

      <RouterLink class="card" to="/orders">
        <h3>Заказы</h3>
        <p>Работа с заказами</p>
      </RouterLink>

      <RouterLink class="card" to="/orderitems">
        <h3>Позиции заказа</h3>
        <p>Работа с позициями заказов</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>