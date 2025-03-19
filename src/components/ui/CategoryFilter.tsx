import { useState, useMemo } from "react";
import {
  SfAccordionItem,
  SfListItem,
  SfIconChevronLeft,
  SfIconCheck,
} from "@storefront-ui/react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../hooks/usePrintful";
import { CategoryFilterProps } from "../../types/Props.types";
import CategoryList from "./CategoryList";
import { buildCategoryTree } from "../../utils/common";

export default function CategoryFilter({ categories, id }: CategoryFilterProps) {
  const [opened, setOpened] = useState(true);
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(id ? Number(id) : undefined);

  // ✅ Only fetch category if an ID is selected
  const { category, isError } = useCategory(id ?? null);

  // ✅ Update category list only when a category is fetched
  const mergedCategories = useMemo(() => {
    if (id && category && !categories.some((cat) => cat.id === category.id)) {
      return [...categories, category]; // Add fetched category if it's not in the list
    }
    return categories;
  }, [categories, category, id]);

  const handleCategorySelect = (categoryId?: number) => {
    setSelectedCategoryId(categoryId);
    navigate(categoryId ? `/category/${categoryId}` : "/category");
  };

  const nestedCategories = useMemo(() => buildCategoryTree(mergedCategories), [mergedCategories]);

  return (
    <SfAccordionItem
      open={opened}
      onToggle={() => setOpened(!opened)}
      className="w-full"
      summary={
        <div className="flex justify-between p-2 mb-2 bg-neutral-100 md:rounded-md px-4 py-2 text-sm font-bold uppercase">
          <p className="font-medium">Category</p>
          <SfIconChevronLeft
            className={classNames("text-neutral-500", { "rotate-90": opened, "-rotate-90": !opened })}
          />
        </div>
      }
    >
      <ul className="mt-2 mb-6">
        {id && isError && (
          <li className="text-center py-2 text-red-500">Failed to load category. Please try again.</li>
        )}

        {/* All Categories Option */}
        {!isError && (
          <>
            <li key="all">
              <SfListItem
                size="sm"
                as="button"
                onClick={() => handleCategorySelect(undefined)}
                className={classNames("rounded-md py-2 mb-2 bg-gray-100 hover:bg-gray-200")}
                slotSuffix={!id && <SfIconCheck size="sm" />}
              >
                <span className="flex items-center text-base">All</span>
              </SfListItem>
            </li>

            {/* Render Category List */}
            <CategoryList
              categories={nestedCategories}
              handleCategorySelect={handleCategorySelect}
              selectedCategoryId={selectedCategoryId} // ✅ Pass selected category ID
            />
          </>
        )}
      </ul>
    </SfAccordionItem>
  );
}