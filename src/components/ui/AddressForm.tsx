import { SfSelect, SfInput, SfButton } from "@storefront-ui/react";
import {
  FormEventHandler,
  ChangeEvent,
  FocusEvent,
  useState,
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

export default function AddressForm() {
  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem("billingForm") || "{}");
  });
  const [streetIsValid, setStreetIsValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("billingForm", JSON.stringify(formData));
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

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/checkout/shipping");
  };

  return (
    <form
      className="p-4 flex gap-4 flex-wrap text-neutral-900"
      onSubmit={onSubmit}
    >
      <h2 className="w-full typography-headline-4 md:typography-headline-3 font-bold">
        Billing Address
      </h2>
      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">First Name</span>
        <SfInput
          name="firstName"
          value={formData.firstName || ""}
          onChange={handleInputChange}
          autoComplete="given-name"
          required
        />
      </label>
      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">Last Name</span>
        <SfInput
          name="lastName"
          value={formData.lastName || ""}
          onChange={handleInputChange}
          autoComplete="family-name"
          required
        />
      </label>
      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">Phone</span>
        <SfInput
          name="phone"
          value={formData.phone || ""}
          onChange={handleInputChange}
          type="tel"
          autoComplete="tel"
          required
        />
      </label>
      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">Country</span>
        <SfSelect
          name="country"
          value={formData.country || ""}
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
      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">Street</span>
        <SfInput
          name="street"
          value={formData.street || ""}
          onChange={handleInputChange}
          onBlur={validateStreet}
          autoComplete="address-line1"
          required
          invalid={!streetIsValid}
        />
        {!streetIsValid && (
          <strong className="typography-error-sm text-negative-700 font-medium">
            Please provide a street name
          </strong>
        )}
      </label>
      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">City</span>
        <SfInput
          name="city"
          value={formData.city || ""}
          onChange={handleInputChange}
          autoComplete="address-level2"
          required
        />
      </label>
      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">State</span>
        <SfSelect
          name="state"
          value={formData.state || ""}
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
      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">ZIP Code</span>
        <SfInput
          name="zipCode"
          value={formData.zipCode || ""}
          onChange={handleInputChange}
          autoComplete="postal-code"
          required
        />
      </label>
      <div className="w-full flex gap-4 mt-4 md:justify-end">
        <SfButton type="reset" variant="secondary" className="w-full md:w-auto">
          Clear all
        </SfButton>
        <SfButton type="submit" className="w-full md:w-auto">
          Continue to Shipping
        </SfButton>
      </div>
    </form>
  );
}
