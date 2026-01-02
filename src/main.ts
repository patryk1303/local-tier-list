import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { configTierStore, getTierLists } from "./stores/tier.store";

configTierStore();
getTierLists();

createApp(App).mount("#app");
