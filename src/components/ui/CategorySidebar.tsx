import { SidebarProps } from "../../types/Props.types";
import { formatTitle } from "../../utils/common";
import CategoryFilter from "./CategoryFilter";

export default function CategorySidebar({ categories, id }: SidebarProps) {
  // Get the selected category title, or fallback to "All Categories"
  const selectedCategoryTitle = id
    ? categories.find((cat) => id === cat.id.toString())?.title
    : undefined;

  // Apply formatting if category title exists, else show "All Categories"
  const formattedTitle = selectedCategoryTitle
    ? formatTitle(decodeURIComponent(selectedCategoryTitle))
    : "All Categories";

  return (
    <>
      <h2 className="text-3xl font-bold">{formattedTitle}</h2>
      <CategoryFilter categories={categories} id={id ?? undefined} />
    </>
  );
}
