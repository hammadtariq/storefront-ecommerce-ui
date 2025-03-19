import { Category } from "../../types/Category";
import CategoryItem from "./CategoryItem";

function CategoryList({
  categories,
  handleCategorySelect,
  selectedCategoryId,
}: {
  categories: Category[];
  handleCategorySelect: (categoryId: number) => void;
  selectedCategoryId?: number;
}) {
  return (
    <ul className="space-y-2">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          handleCategorySelect={handleCategorySelect}
          selectedCategoryId={selectedCategoryId}
        />
      ))}
    </ul>
  );
}

export default CategoryList;
