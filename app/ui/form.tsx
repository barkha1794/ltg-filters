import type { ComponentPropsWithRef, ReactNode } from "react";
import { forwardRef, Children, cloneElement, isValidElement } from "react";
import { Para } from "./text";
import { twMerge } from "tailwind-merge";

export type FieldProps = {
  id: string;
  label: ReactNode;
  children: ReactNode;
  error?: ReactNode;
  className?: string;
};

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ id, label, children, error, className }, ref) => {
    return (
      <div className={twMerge("flex flex-col gap-2", className)} ref={ref}>
        <label
          htmlFor={id}
          className="text-sm select-none cursor-pointer font-medium"
        >
          {label}
        </label>
        {Children.map(
          children,
          (child, index) =>
            isValidElement(child) &&
            (index === 0 ? cloneElement(child, { id } as any) : child)
        )}
        {error && <Para className="text-red">{error}</Para>}
      </div>
    );
  }
);

Field.displayName = "Field";

export const FieldInline = forwardRef<
  HTMLLabelElement,
  Pick<FieldProps, "label" | "children" | "className">
>(({ label, children, className }, ref) => {
  return (
    <label
      ref={ref}
      className={twMerge(
        "flex gap-2 items-start text-sm select-none cursor-pointer",
        className
      )}
    >
      {children}
      {label}
    </label>
  );
});

FieldInline.displayName = "FieldInline";
