import { createRouter } from "@nanostores/router";

export const $router = createRouter({
  home: "/",
  tier: "/tier/:id",
});
