export const API_ENDPOINTS = {
  API_BASE_URL: import.meta.env.VITE_BASE_URL,
};

export const ENUMS = {
  PRODUCT_STATUS: [
    "all",
    "synced",
    "unsynced",
    "ignored",
    "imported",
    "discontinued",
    "out_of_stock",
  ] as const,
};
