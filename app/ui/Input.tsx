import { ComponentPropsWithRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentPropsWithRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={twMerge(
          "border border-solid border-grey px-4 py-2",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export const Checkbox = forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  ({ className, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={twMerge("mt-1", className)}
      {...props}
    />
  )
);

Checkbox.displayName = "Checkbox";

export const Radio = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      type="radio"
      ref={ref}
      className={twMerge("mt-1", className)}
      {...props}
    />
  )
);

Radio.displayName = "Radio";

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithRef<"button">
>(({ type = "button", className, ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={twMerge("bg-brand text-white py-2 px-4 rounded", className)}
    {...props}
  />
));

Button.displayName = "Button";
