"use client";
import { Checkbox, Input, Radio, Button } from "./ui/Input";
import { Field, FieldInline } from "./ui/form";
import { Heading } from "./ui/text";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { onSubmit } from "./actions";
import { RangeSlider, type RangeSliderRefType } from "./ui/lib/RangeSlider";

function SubmitButton() {
  const status = useFormStatus();
  return (
    <Button type="submit" disabled={status.pending} className="self-start">
      {status.pending ? "Submitting..." : "Submit"}
    </Button>
  );
}

export default function Home() {
  const [state, formAction] = useFormState(onSubmit, {
    fieldErrors: {},
    formErrors: [],
  });
  const sliderRef = useRef<RangeSliderRefType>(null);
  console.log("rerender");

  const getError = (key: string) =>
    "fieldErrors" in state &&
    state.fieldErrors?.[key] &&
    String(state.fieldErrors[key]);

  return (
    <main className="flex min-h-screen flex-col gap-4">
      <Heading>Server Form Demo</Heading>
      <form
        autoComplete="off"
        action={formAction}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Field id="fname" label="First Name" error={getError("first_name")}>
            <Input name="first_name" />
          </Field>
          <Field id="lname" label="Last Name" error={getError("last_name")}>
            <Input name="last_name" />
          </Field>
          <Field id="email" label="Email" error={getError("email")}>
            <Input type="email" name="email" placeholder="abc@def.com" />
          </Field>
          <Field id="password" label="Password" error={getError("password")}>
            <Input type="password" name="password" placeholder="XXX1234" />
          </Field>
          <FieldInline label="Are you Interested?">
            <Checkbox name="interested" />
          </FieldInline>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "React", name: "react" },
              { label: "Typescript", name: "typescript" },
              { label: "CSS", name: "css" },
              { label: "Tailwind", name: "tailwind" },
              { label: "NextJS", name: "nextjs" },
            ].map(({ label, name }) => (
              <FieldInline label={label} key={name}>
                <Checkbox name="courses" value={name} />
              </FieldInline>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <FieldInline label="Male">
              <Radio name="gender" value="male" />
            </FieldInline>
            <FieldInline label="Female">
              <Radio name="gender" value="female" />
            </FieldInline>
            <FieldInline label="Others">
              <Radio name="gender" value="others" />
            </FieldInline>
          </div>
          <Field id="price" label="Select Price Range">
            <RangeSlider
              ref={sliderRef}
              minLimit={100}
              maxLimit={800}
              defaultMinValue={200}
              defaultMaxValue={600}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SubmitButton />
          <Button
            type="reset"
            onClick={() => {
              sliderRef.current?.handleReset();
            }}
          >
            Reset
          </Button>
        </div>
      </form>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </main>
  );
}
