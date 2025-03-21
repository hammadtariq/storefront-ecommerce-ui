import {
  SfSelect,
  SfInput,
  SfCheckbox,
  SfButton,
  SfListItem,
  SfRadio,
} from "@storefront-ui/react";
import {
  FormEventHandler,
  ChangeEvent,
  FocusEvent,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

const countries = [
  "Germany",
  "Great Britain",
  "Poland",
  "United States of America",
] as const;
const states = ["California", "Florida", "New York", "Texas"] as const;

export default function ShippingForm() {
  // Load saved form data
  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem("shippingForm") || "{}");
  });
  const [streetIsValid, setStreetIsValid] = useState(true);
  const [useBilling, setUseBilling] = useState(formData.useBilling || false);
  const [checkedState, setCheckedState] = useState(
    formData.deliveryOption || ""
  );
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("shippingForm", JSON.stringify(formData));
  }, [formData]);

  const validateStreet = (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => {
    setStreetIsValid(!!e.target.value);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = () => {
    setUseBilling((prev: boolean) => !prev);
    setFormData((prev: FormData) => ({
      ...prev,
      useBilling: !useBilling,
    }));
  };

  const estimatedDelivery = useCallback(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toDateString();
  }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    console.log(formJSON);
    navigate("/checkout/payment"); // Navigate to payment step
  };

  const deliveryOptions = [
    {
      name: "Standard",
      cost: "Free",
      date: estimatedDelivery(),
    },
    {
      name: "Express",
      cost: "$5.00",
      date: `Tomorrow, ${tomorrow.toDateString().slice(4)}`,
    },
  ];

  return (
    <form
      className="p-4 flex gap-4 flex-wrap text-neutral-900"
      onSubmit={onSubmit}
    >
      <h2 className="w-full typography-headline-4 md:typography-headline-3 font-bold">
        Shipping Address
      </h2>

      <label className="w-full flex items-center gap-2">
        <SfCheckbox checked={useBilling} onChange={handleCheckboxChange} />
        Same as billing address
      </label>

      {!useBilling && (
        <>
          <label className="w-full md:w-auto flex-grow flex flex-col gap-0.5 mt-4 md:mt-0">
            <span className="typography-text-sm font-medium">First Name</span>
            <SfInput
              name="shippingFirstName"
              value={formData.shippingFirstName || ""}
              onChange={handleInputChange}
              autoComplete="given-name"
              required
            />
          </label>
          <label className="w-full md:w-auto flex-grow flex flex-col gap-0.5">
            <span className="typography-text-sm font-medium">Last Name</span>
            <SfInput
              name="shippingLastName"
              value={formData.shippingLastName || ""}
              onChange={handleInputChange}
              autoComplete="family-name"
              required
            />
          </label>
          <label className="w-full flex flex-col gap-0.5">
            <span className="typography-text-sm font-medium">Phone</span>
            <SfInput
              name="shippingPhone"
              value={formData.shippingPhone || ""}
              onChange={handleInputChange}
              type="tel"
              autoComplete="tel"
              required
            />
          </label>
          <label className="w-full flex flex-col gap-0.5">
            <span className="typography-text-sm font-medium">Country</span>
            <SfSelect
              name="shippingCountry"
              value={formData.shippingCountry || ""}
              onChange={handleInputChange}
              placeholder="-- Select --"
              autoComplete="country-name"
              required
            >
              {countries.map((countryName) => (
                <option key={countryName}>{countryName}</option>
              ))}
            </SfSelect>
          </label>
          <div className="w-full md:w-auto flex-grow flex flex-col gap-0.5">
            <label>
              <span className="typography-text-sm font-medium">Street</span>
              <SfInput
                name="shippingStreet"
                autoComplete="address-line1"
                value={formData.shippingStreet || ""}
                className="mt-0.5"
                onBlur={validateStreet}
                onChange={handleInputChange}
                required
                invalid={!streetIsValid}
              />
            </label>
            <div className="flex flex-col mt-0.5">
              {!streetIsValid && (
                <strong className="typography-error-sm text-negative-700 font-medium">
                  Please provide a street name
                </strong>
              )}
              <small className="typography-hint-xs text-neutral-500 mt-0.5">
                Street address or P.O. Box
              </small>
            </div>
          </div>
          <div className="w-full flex flex-col gap-0.5 md:w-[120px]">
            <label>
              <span className="typography-text-sm font-medium">
                Apt#, Suite, etc
              </span>
              <SfInput name="shippingAptNo" className="mt-0.5" />
            </label>
            <small className="typography-hint-xs text-neutral-500 mt-0.5">
              Optional
            </small>
          </div>
          <label className="w-full flex flex-col gap-0.5">
            <span className="typography-text-sm font-medium">City</span>
            <SfInput
              value={formData.shippingCity || ""}
              onChange={handleInputChange}
              name="shippingCity"
              autoComplete="address-level2"
              required
            />
          </label>
          <label className="w-full md:w-auto flex flex-col gap-0.5 flex-grow">
            <span className="typography-text-sm font-medium">State</span>
            <SfSelect
              name="shippingState"
              value={formData.shippingState || ""}
              onChange={handleInputChange}
              placeholder="-- Select --"
              autoComplete="address-level1"
              required
            >
              {states.map((stateName) => (
                <option key={stateName}>{stateName}</option>
              ))}
            </SfSelect>
          </label>
          <label className="w-full flex flex-col gap-0.5 md:w-[120px]">
            <span className="typography-text-sm font-medium">ZIP Code</span>
            <SfInput
              name="shippingZipCode"
              placeholder="eg. 12345"
              autoComplete="postal-code"
              required
            />
          </label>
          <label className="w-full flex flex-col gap-0.5">
            <span className="typography-text-sm font-medium">
              Delivery Instructions
            </span>
            <SfInput
              name="deliveryInstructions"
              autoComplete="delivery-instructions"
              value={formData.deliveryInstructions || ""}
              onChange={handleInputChange}
              placeholder="Optional instructions for delivery"
            />
          </label>
        </>
      )}

      {deliveryOptions.map(({ name, cost, date }) => (
        <SfListItem
          as="label"
          key={name}
          slotPrefix={
            <SfRadio
              name="deliveryOption"
              value={name}
              checked={checkedState === name}
              onChange={(event) => {
                setCheckedState(event.target.value);
                setFormData((prev: FormData) => ({
                  ...prev,
                  deliveryOption: event.target.value,
                }));
              }}
            />
          }
          slotSuffix={<span className="text-gray-900">{cost}</span>}
        >
          {name}
          <span className="text-xs text-gray-500">{date}</span>
        </SfListItem>
      ))}

      <div className="w-full flex gap-4 mt-4 md:mt-0 md:justify-end">
        <SfButton type="reset" variant="secondary" className="w-full md:w-auto">
          Clear all
        </SfButton>
        <SfButton type="submit" className="w-full md:w-auto">
          Continue to Payment
        </SfButton>
      </div>
    </form>
  );
}
