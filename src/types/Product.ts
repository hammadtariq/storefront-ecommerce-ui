import { ENUMS } from "../constants";

export interface Product {
  id?: number;
  sync_product: {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
  };
  sync_variants?: SyncVariant[];
}

interface SyncVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  is_ignored: boolean;
  sku: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: FileDetails[];
  options: ProductOption[];
  main_category_id: number;
  warehouse_product_id: number;
  warehouse_product_variant_id: number;
  size: string;
  color: string;
  availability_status: string;
}

interface FileDetails {
  type: string;
  id: number;
  url: string;
  options: FileOption[];
  hash: string;
  filename: string;
  mime_type: string;
  size: number;
  width: number;
  height: number;
  dpi: number;
  status: string;
  created: number;
  thumbnail_url: string;
  preview_url: string;
  visible: boolean;
  is_temporary: boolean;
  stitch_count_tier: string;
}

interface FileOption {
  id: string;
  value: string;
}

interface ProductOption {
  id: string;
  value: string;
}

export type ProductStatus = (typeof ENUMS.PRODUCT_STATUS)[number];

export type ProductParams = {
  status?: ProductStatus;
  categoryId?: string;
};
