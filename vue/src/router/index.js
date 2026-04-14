import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import MotorcyclesView from "../views/MotorcyclesView.vue";
import ManufacturersView from "../views/ManufacturersView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import ClientsView from "../views/ClientsView.vue";
import ManagersView from "../views/ManagersView.vue";
import OrdersView from "../views/OrdersView.vue";
import OrderItemsView from "../views/OrderItemsView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/motorcycles", name: "motorcycles", component: MotorcyclesView },
  { path: "/manufacturers", name: "manufacturers", component: ManufacturersView },
  { path: "/categories", name: "categories", component: CategoriesView },
  { path: "/clients", name: "clients", component: ClientsView },
  { path: "/managers", name: "managers", component: ManagersView },
  { path: "/orders", name: "orders", component: OrdersView },
  { path: "/orderitems", name: "orderitems", component: OrderItemsView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;