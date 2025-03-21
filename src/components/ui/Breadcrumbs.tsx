import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SfLink, SfIconChevronRight } from "@storefront-ui/react";

const breadcrumbPaths: { [key: string]: string } = {
  "/checkout": "Cart",
  "/checkout/information": "Information",
  "/checkout/shipping": "Shipping",
  "/checkout/payment": "Payment",
};

export default function Breadcrumbs() {
  const location = useLocation();
  const [visitedSteps, setVisitedSteps] = useState<string[]>([]);

  useEffect(() => {
    let storedSteps = JSON.parse(sessionStorage.getItem("visitedSteps") || "[]");

    // Find the index of the current path in the predefined order
    const stepsOrder = Object.keys(breadcrumbPaths);
    const currentStepIndex = stepsOrder.indexOf(location.pathname);

    if (currentStepIndex !== -1) {
      // Keep only the steps up to the current step (removing later steps when going back)
      storedSteps = storedSteps.filter(
        (step) => stepsOrder.indexOf(step) <= currentStepIndex
      );

      // Add the current step if not already there
      if (!storedSteps.includes(location.pathname)) {
        storedSteps.push(location.pathname);
      }

      sessionStorage.setItem("visitedSteps", JSON.stringify(storedSteps));
      setVisitedSteps(storedSteps);
    }
  }, [location.pathname]);

  const breadcrumbs = visitedSteps.map((path) => ({
    name: breadcrumbPaths[path],
    link: path,
  }));

  return (
    <nav className="flex items-center text-sm font-normal font-body">
      <ol className="flex w-auto leading-none group md:flex-wrap">
        {breadcrumbs.map((item, index) => (
          <li
            className="hidden sm:flex items-center text-neutral-500 last-of-type:text-neutral-900 last-of-type:font-medium"
            key={item.link}
          >
            {index !== 0 && <SfIconChevronRight size="sm" className="mx-0.5 text-disabled-500" />}
            {index < breadcrumbs.length - 1 ? (
              <SfLink href={item.link} variant="secondary" className="leading-5 hover:underline">
                {item.name}
              </SfLink>
            ) : (
              <span>{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
