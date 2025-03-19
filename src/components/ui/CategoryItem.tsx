import { SfAccordionItem, SfIconCheck } from "@storefront-ui/react";
import { useState } from "react";
import classNames from "classnames";
import { Category } from "../../types/Category";
import CategoryList from "./CategoryList";
import { formatTitle } from "../../utils/common";

function CategoryItem({
  category,
  handleCategorySelect,
  selectedCategoryId,
}: {
  category: Category;
  handleCategorySelect: (categoryId: number) => void;
  selectedCategoryId?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = selectedCategoryId === category.id;

  return (
    <SfAccordionItem
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      className="border border-gray-200 rounded-md space-y-2"
      summary={
        <button
          onClick={() => handleCategorySelect(category.id)}
          className={classNames(
            "w-full flex justify-between items-center px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200",
            { "bg-primary-100 font-medium": isSelected } // ✅ Highlight selected category
          )}
        >
          <span>{formatTitle(category.title)}</span>
          {isSelected && (
            <SfIconCheck size="sm" className="text-primary-700 ml-2" />
          )}{" "}
          {/* ✅ Tick icon visible */}
        </button>
      }
    >
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="pl-4 space-y-2 pb-2">
          <CategoryList
            categories={category.subcategories}
            handleCategorySelect={handleCategorySelect}
            selectedCategoryId={selectedCategoryId} // ✅ Pass selected state deeper
          />
        </div>
      )}
    </SfAccordionItem>
  );
}
export default CategoryItem;
