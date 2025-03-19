import { useState } from "react";
import {
  SfScrollable,
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
} from "@storefront-ui/react";
import classNames from "classnames";
import { GalleryWithBulletsProps } from "../../types/Props.types";

export default function GalleryWithBullets({
  images,
  loading,
}: GalleryWithBulletsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative max-h-[450px] max-w-[900px] flex flex-col w-full aspect-[5/4] gap-1">
      <SfScrollable
        className="w-full h-full snap-x snap-mandatory overflow-hidden"
        wrapperClassName="group/scrollable h-full"
        activeIndex={activeIndex}
        isActiveIndexCentered
        prevDisabled={activeIndex === 0}
        nextDisabled={activeIndex === images.length - 1}
        buttonsPlacement="block"
        onPrev={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
        onNext={() =>
          setActiveIndex((prev) => Math.min(prev + 1, images.length - 1))
        }
        slotPreviousButton={
          <SfButton
            className="hidden group-hover/scrollable:block disabled:!hidden absolute !rounded-full !p-3 z-10 top-1/2 left-4 bg-white"
            variant="secondary"
            size="lg"
            slotPrefix={<SfIconChevronLeft />}
          />
        }
        slotNextButton={
          <SfButton
            className="hidden group-hover/scrollable:block disabled:!hidden absolute !rounded-full !p-3 z-10 top-1/2 right-4 bg-white"
            variant="secondary"
            size="lg"
            slotPrefix={<SfIconChevronRight />}
          />
        }
      >
        {loading ? (
          <div className="animate-pulse flex justify-center items-center basis-full snap-center shrink-0 grow bg-gray-200 h-[450px] w-full rounded-lg">
            <div className="w-3/4 h-3/4 bg-gray-300 rounded"></div>
          </div>
        ) : (
          images.map(({ imageSrc, alt }, index) => (
            <div
              className="relative flex justify-center basis-full snap-center shrink-0 grow"
              key={`${alt}-${index}`}
            >
              <img
                aria-label={alt}
                aria-hidden={activeIndex !== index}
                className="object-contain w-auto h-full"
                alt={alt}
                src={imageSrc}
                width={600}
                height={450}
                draggable="true"
              />
            </div>
          ))
        )}
      </SfScrollable>
      <div className="flex-shrink-0 basis-auto">
        <div className="flex w-full gap-0.5 mt-1">
          {images.map(({ alt }, index) => (
            <button
              key={`${index}-bullet`}
              aria-label={alt}
              aria-current={activeIndex === index}
              type="button"
              className={classNames(
                "w-full relative border-b-4 transition-colors focus-visible:outline focus-visible:outline-offset-0",
                {
                  "border-primary-700": activeIndex === index,
                  "border-gray-200": activeIndex !== index,
                }
              )}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
