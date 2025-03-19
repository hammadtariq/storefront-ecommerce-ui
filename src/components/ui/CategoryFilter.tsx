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

export default function CategoryFilter({
  categories,
  id,
}: CategoryFilterProps) {
  const [opened, setOpened] = useState(true);
  const navigate = useNavigate();

  // ✅ Only fetch category if an ID is selected
  const { category, isError } = useCategory(id ?? null);

  // ✅ Update category list only when a category is fetched
  const mergedCategories = useMemo(() => {
    if (id && category && !categories.some((cat) => cat.id === category.id)) {
      return [...categories, category]; // Add fetched category if it's not in the list
    }
    return categories;
  }, [categories, category, id]);

  // Handle category selection
  const handleCategorySelect = (categoryId?: number) => {
    navigate(categoryId ? `/category/${categoryId}` : "/category");
  };

  return (
    <SfAccordionItem
      open={opened}
      onToggle={() => setOpened(!opened)}
      className="w-full"
      summary={
        <div className="flex justify-between p-2 mb-2 bg-neutral-100 md:rounded-md px-4 py-2 text-sm font-bold uppercase">
          <p className="font-medium">Category</p>
          <SfIconChevronLeft
            className={classNames("text-neutral-500", {
              "rotate-90": opened,
              "-rotate-90": !opened,
            })}
          />
        </div>
      }
    >
      <ul className="mt-2 mb-6">
        {/* Show error state only when fetching a category by ID */}
        {id && isError && (
          <li className="text-center py-2 text-red-500">
            Failed to load category. Please try again.
          </li>
        )}

        {/* All Categories Option */}
        {!isError && (
          <>
            <li key="all">
              <SfListItem
                size="sm"
                as="button"
                onClick={() => handleCategorySelect()}
                className={classNames("rounded-md active:bg-primary-100", {
                  "bg-primary-100 font-medium": !id,
                })}
                slotSuffix={
                  !id && <SfIconCheck size="sm" className="text-primary-700" />
                }
              >
                <span className="flex items-center">All</span>
              </SfListItem>
            </li>

            {/* Render Merged Categories */}
            {mergedCategories.map((category) => (
              <li key={category.id}>
                <SfListItem
                  size="sm"
                  as="button"
                  onClick={() => handleCategorySelect(category.id)}
                  className={classNames("rounded-md active:bg-primary-100", {
                    "bg-primary-100 font-medium": id === category.id.toString(),
                  })}
                  slotSuffix={
                    id === category.id.toString() && (
                      <SfIconCheck size="sm" className="text-primary-700" />
                    )
                  }
                >
                  <span className="flex items-center">{category.title}</span>
                </SfListItem>
              </li>
            ))}
          </>
        )}
      </ul>
    </SfAccordionItem>
  );
}
