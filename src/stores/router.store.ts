import { atom } from "nanostores";

// Define route types
interface Route {
  route: string;
  params?: Record<string, string>;
}

export const $router = atom<Route | null>(null);

const routes = {
  home: "/",
  tier: "/tier/:id",
};

function parseHash(hash: string): Route | null {
  const path = hash.startsWith("#") ? hash.substring(1) : hash;

  if (path === "/" || path === "") {
    return { route: "home", params: {} };
  }

  if (path.startsWith("/tier/")) {
    const segments = path.split("/");
    if (segments.length >= 3) {
      const id = segments[2] as string;
      return {
        route: "tier",
        params: { id },
      };
    }
  }

  return null;
}

function updateRoute() {
  const currentHash = window.location.hash;
  const route = parseHash(currentHash);
  $router.set(route);
}

export function navigateTo(
  routeName: keyof typeof routes,
  params?: Record<string, string>,
) {
  let path = routes[routeName];

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
  }

  window.location.hash = path;
}

export function getPagePath(
  routeName: keyof typeof routes,
  params?: Record<string, string>,
): string {
  let path = routes[routeName];

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
  }

  return `#${path}`;
}

window.addEventListener("hashchange", updateRoute);

updateRoute();
