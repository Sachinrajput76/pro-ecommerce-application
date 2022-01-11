import FormField from "./FormField";
import { useState } from "react";

const BillingDetailsFields = () => {
  const [name, setName] = useState("john")
  const [email, setEmail] = useState("john@gmail.com")
  const [line1, setline1] = useState("185 Berry St. Suite 550")
  const [country, setCountry] = useState("US")
  const [state, setState] = useState("Maryland")
  const [city, setCity] = useState("Suitland")
  const [postal_code, setPostal_code] = useState("20746")
  return (
    <>
      <FormField
        name="name"
        label="Name"
        type="text"
        value={name}
        setName={setName}
        placeholder="Jane Doe"
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        value={email}
        setName={setEmail}
        placeholder="jane.doe@example.com"
        required
      />
      <FormField
        name="line1"
        label="Line1"
        type="text"
        value={line1}
        setName={setline1}
        placeholder="185 Berry St. Suite 550"
        required
      />
      <FormField
        name="country"
        label="Country"
        type="text"
        value={country}
        setName={setCountry}
        placeholder="US"
        required
      />
      <FormField
        name="state"
        label="State"
        type="text"
        value={state}
        setName={setState}
        placeholder="Maryland"
        required
      />
      <FormField
        name="city"
        label="City"
        type="text"
        value={city}
        setName={setCity}
        placeholder="Suitland"
        required
      />
      <FormField
        name="postal_code"
        label="Zip"
        type="text"
        value={postal_code}
        setName={setPostal_code}
        placeholder="20746"
        required
      />
    </>
  );
};

export default BillingDetailsFields;
