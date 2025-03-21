import { SfButton, SfIconRemove, SfIconAdd } from "@storefront-ui/react";
import { useId, ChangeEvent } from "react";
import { clamp } from "@storefront-ui/shared";

interface CounterProps {
  value: number;
  min?: number;
  max?: number;
  onValueChange: (newValue: number) => void;
}

export default function Counter({ value, min = 1, max = 999, onValueChange }: CounterProps) {
  const inputId = useId();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = parseFloat(event.target.value);
    onValueChange(Number(clamp(nextValue, min, max)));
  };

  return (
    <div className="flex border border-neutral-300 rounded-md">
      <SfButton
        variant="tertiary"
        square
        className="rounded-r-none p-3"
        disabled={value <= min}
        aria-controls={inputId}
        aria-label="Decrease value"
        onClick={() => onValueChange(value - 1)}
      >
        <SfIconRemove />
      </SfButton>
      <input
        id={inputId}
        type="number"
        role="spinbutton"
        className="grow mx-2 w-8 text-center bg-transparent font-medium appearance-none focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
        min={min}
        max={max}
        value={value}
        onChange={handleOnChange}
      />
      <SfButton
        variant="tertiary"
        square
        className="rounded-l-none p-3"
        disabled={value >= max}
        aria-controls={inputId}
        aria-label="Increase value"
        onClick={() => onValueChange(value + 1)}
      >
        <SfIconAdd />
      </SfButton>
    </div>
  );
}
