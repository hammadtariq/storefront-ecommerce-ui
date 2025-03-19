import { Category } from "./Category";
import { Product } from "./Product";

export type CategoryFilterProps = {
  categories: Category[];
  id?: string;
};

export type SidebarProps = {
  categories: Category[];
  id?: string;
};

export type GalleryWithBulletsProps = {
  images: {
    imageSrc: string;
    alt: string;
  }[];
};

export type ProductDetailsProps = {
  product: Product;
};
