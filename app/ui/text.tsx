import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Heading = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithRef<"h1">
>(({ className, ...props }, ref) => (
  <h1
    className={twMerge("text-3xl font-bold", className)}
    ref={ref}
    {...props}
  />
));

Heading.displayName = "Heading";

export const SubHeading = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithRef<"h3">
>(({ className, ...props }, ref) => (
  <h3
    className={twMerge("text-xl font-medium", className)}
    ref={ref}
    {...props}
  />
));

SubHeading.displayName = "SubHeading";

export const Para = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithRef<"p">
>(({ className, ...props }, ref) => (
  <p className={twMerge("text-sm", className)} ref={ref} {...props} />
));

Para.displayName = "Para";
