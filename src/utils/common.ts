// /**
//  * Safely parses a JSON string.
//  * @param jsonString The stringified JSON input
//  * @param fallback The fallback value in case of an error (default: empty array)
//  * @returns Parsed JSON object or fallback value
//  */
// export const safeJsonParse = <T>(
//     jsonString: string | undefined,
//     fallback: T
//   ): T => {
//     try {
//       if (!jsonString) {
//         return fallback;
//       }
//       return JSON.parse(jsonString) as T;
//     } catch {
//       return fallback;
//     }
//   };

import { Category } from "../types/Category";
import { Product } from "../types/Product";

//   /**
//    * Converts object keys to snake_case recursively.
//    */
//   function toSnakeCase(str: string): string {
//     return str
//       .replace(/([a-z])([A-Z])/g, "$1_$2")
//       .replace(/[-\s]+/g, "_")
//       .toLowerCase();
//   }

//   /**
//    * Recursively transforms object keys to snake_case.
//    */
//   export function transformToSnakeCase<T>(data: T): T {
//     if (Array.isArray(data)) {
//       return data.map((item) => transformToSnakeCase(item)) as unknown as T;
//     } else if (data !== null && typeof data === "object") {
//       return Object.keys(data).reduce<Record<string, T>>((acc, key) => {
//         const snakeKey = toSnakeCase(key);
//         acc[snakeKey] = transformToSnakeCase((data as Record<string, T>)[key]);
//         return acc;
//       }, {}) as unknown as T;
//     }
//     return data;
//   }

export const generateShortDescription = (product: { name: string }) => {
  const descriptions = [
    `Classic ${product.name} for daily wear.`,
    `Sleek & comfy ${product.name}.`,
    `Essential ${product.name} for any day.`,
    `Light, soft, and stylish.`,
    `Perfect fit, premium feel.`,
    `Everyday comfort, redefined.`,
  ];

  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Function to format category title
export const formatTitle = (title: string) => {
  return title
    .replace(/[^\w\s]/g, "") // Remove special characters (anything not a word or space)
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join words back into a string
};

// Helper function to get a product's unique identifier
export const getProductId = (product: Product) =>
  "sync_product" in product ? product.sync_product.id : product.id;

export const buildCategoryTree = (
  categories: Category[],
  parentId: number = 0
): Category[] => {
  return categories
    .filter((category) => category.parent_id === parentId)
    .map((category) => ({
      ...category,
      subcategories: buildCategoryTree(categories, category.id),
    }));
};
