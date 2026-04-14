<template>
  <div class="app">
    <header class="header">
      <h1>Мотосалон</h1>
      <nav class="nav">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/motorcycles">Мотоциклы</RouterLink>
        <RouterLink to="/manufacturers">Производители</RouterLink>
        <RouterLink to="/categories">Категории</RouterLink>
        <RouterLink to="/clients">Клиенты</RouterLink>
        <RouterLink to="/managers">Менеджеры</RouterLink>
        <RouterLink to="/orders">Заказы</RouterLink>
        <RouterLink to="/orderitems">Позиции заказа</RouterLink>
      </nav>
    </header>

    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>