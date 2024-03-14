"use client";

import { Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Button, Checkbox, Radio } from "../ui/Input";
import { Field, FieldInline } from "../ui/form";
import { RangeSlider, type RangeSliderRefType } from "../ui/lib/RangeSlider";
import { Heading } from "../ui/text";

function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sliderRef = useRef<RangeSliderRefType>(null);

  const urlPriceMin = searchParams.get("min")
    ? parseInt(String(searchParams.get("min")))
    : undefined;
  const urlPriceMax = searchParams.get("max")
    ? parseInt(String(searchParams.get("max")))
    : undefined;

  return (
    <main className="flex min-h-screen flex-col gap-4">
      <Heading>Uncontrolled Form Demo</Heading>

      <form method="GET" className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <label>Number of Seats</label>
            <div className="flex gap-2">
              {["Any", "1", "2", "3", "4", "5+"].map((seat) => (
                <FieldInline label={seat} key={seat}>
                  <Radio
                    name="seats"
                    defaultChecked={searchParams.get("seats") === seat}
                    value={seat}
                    onChange={(e) => e.target.closest("form")?.submit()}
                  />
                </FieldInline>
              ))}
            </div>
          </div>

          <FieldInline label="Seated Together?">
            <Checkbox
              name="together"
              defaultChecked={searchParams.get("together") === "on"}
              onChange={(e) => e.target.closest("form")?.submit()}
            />
          </FieldInline>

          <fieldset className="flex flex-col gap-8">
            <legend>Inside Dialog Box</legend>

            <Button
              type="reset"
              onClick={() => {
                sliderRef.current?.handleReset();
                router.push("/filters");
              }}
            >
              Clear All
            </Button>

            <Field id="price" label="Select Price Range">
              <RangeSlider
                ref={sliderRef}
                minLimit={100}
                maxLimit={800}
                defaultMinValue={urlPriceMin}
                defaultMaxValue={urlPriceMax}
              />
            </Field>

            <Field id="sections" label="Sections">
              <div className="flex flex-col gap-2">
                {[
                  { label: "Category 1", name: "category1" },
                  { label: "Category 2", name: "category2" },
                  { label: "Category 3", name: "category3" },
                  { label: "Category 4", name: "category4" },
                  { label: "Category 5", name: "category5" },
                  { label: "Category 6", name: "category6" },
                ].map(({ label, name }) => (
                  <FieldInline label={label} key={name}>
                    <Checkbox
                      name="sections"
                      value={name}
                      defaultChecked={searchParams
                        .getAll("sections")
                        .includes(name)}
                    />
                  </FieldInline>
                ))}
              </div>
            </Field>
            <Button type="submit">Submit</Button>
          </fieldset>
        </div>
      </form>
    </main>
  );
}

export default function FiltersPage() {
  return (
    <Suspense fallback="Loading...">
      <Filters />
    </Suspense>
  );
}
