import { SfButton } from "@storefront-ui/react";
import classNames from "classnames";
import Hero from "../components/ui/Hero";
import { Link } from "react-router-dom";

const displayDetails = [
  {
    image:
      "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/display-2.png",
    title: "Pack it Up",
    subtitle: "Be active",
    description: "Explore the great outdoors with our backpacks",
    buttonText: "Discover now",
    link: "/category",
    reverse: true,
    backgroundColor: "bg-warning-200",
  },
];

export default function HomePage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row flex-wrap w-full">
        {displayDetails.map(
          ({
            image,
            title,
            subtitle,
            description,
            buttonText,
            backgroundColor,
            link,
            reverse,
          }) => (
            <div
              key={title}
              className={classNames("relative flex w-full", backgroundColor)}
            >
              <Link
                className="absolute w-full h-full z-1 focus-visible:outline focus-visible:rounded-lg"
                aria-label={title}
                to={link}
              />
              <div
                className={classNames(
                  "flex justify-between overflow-hidden w-full",
                  {
                    "flex-row-reverse": reverse,
                  }
                )}
              >
                <div className="flex flex-col justify-center items-start p-6 lg:p-10 w-1/2">
                  <p
                    className={classNames(
                      "uppercase typography-text-xs block font-bold tracking-widest"
                    )}
                  >
                    {subtitle}
                  </p>
                  <h2
                    className={classNames(
                      "mb-4 mt-2 font-bold typography-display-3"
                    )}
                  >
                    {title}
                  </h2>
                  <p className="typography-text-base block mb-4">
                    {description}
                  </p>
                  <SfButton className="!bg-black">{buttonText}</SfButton>
                </div>
                <img
                  src={image}
                  alt={title}
                  className="w-1/2 self-end object-contain"
                />
              </div>
            </div>
          )
        )}
      </div>
      <Hero />
    </div>
  );
}
