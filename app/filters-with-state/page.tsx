"use client";

import { useRef, useState } from "react";
import { Button, Checkbox, Radio } from "../ui/Input";
import { Field, FieldInline } from "../ui/form";
import { RangeSlider, type RangeSliderRefType } from "../ui/lib/RangeSlider";
import { Heading } from "../ui/text";

const PRICE_MIN_LIMIT = 100;
const PRICE_MAX_LIMIT = 20530;

export default function Filters() {
  console.log("rerendering controlled page");
  const sliderRef = useRef<RangeSliderRefType>(null);

  const [filters, setFilters] = useState({
    seats: "Any",
    together: false,
    sections: new Set<string>(),
    price: {
      min: PRICE_MIN_LIMIT,
      max: PRICE_MAX_LIMIT,
    },
  });

  return (
    <main className="flex min-h-screen flex-col gap-4">
      <Heading>Controlled Form Demo</Heading>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <label>Number of Seats</label>
            <div className="flex gap-2">
              {["Any", "1", "2", "3", "4", "5+"].map((seat) => (
                <FieldInline label={seat} key={seat}>
                  <Radio
                    name="seats"
                    checked={filters.seats === seat}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, seats: e.target.value }))
                    }
                    value={seat}
                  />
                </FieldInline>
              ))}
            </div>
          </div>

          <FieldInline label="Seated Together?">
            <Checkbox
              name="together"
              checked={filters.together}
              onChange={() =>
                setFilters((f) => ({ ...f, together: !f.together }))
              }
            />
          </FieldInline>

          <fieldset className="flex flex-col gap-8">
            <legend>Inside Dialog Box</legend>

            <Button
              type="reset"
              onClick={() => {
                sliderRef.current?.handleReset();
                setFilters({
                  seats: "Any",
                  together: false,
                  sections: new Set<string>(),
                  price: {
                    min: PRICE_MIN_LIMIT,
                    max: PRICE_MAX_LIMIT,
                  },
                });
              }}
            >
              Clear All
            </Button>

            <Field id="price" label="Select Price Range">
              <RangeSlider
                ref={sliderRef}
                minLimit={PRICE_MIN_LIMIT}
                maxLimit={PRICE_MAX_LIMIT}
                onValueChange={(price) =>
                  setFilters((oldFilters) => ({ ...oldFilters, price }))
                }
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
                      checked={filters.sections.has(name)}
                      onChange={(e) =>
                        setFilters((f) => {
                          const tempFilters = { ...f };
                          !e.target.checked
                            ? tempFilters.sections.delete(name)
                            : tempFilters.sections.add(name);

                          return tempFilters;
                        })
                      }
                    />
                  </FieldInline>
                ))}
              </div>
            </Field>
            <Button type="submit">Submit</Button>
          </fieldset>
        </div>
      </div>
      <pre>
        {JSON.stringify(
          { filters, sections: Array.from(filters.sections).join(", ") },
          null,
          2
        )}
      </pre>
    </main>
  );
}
