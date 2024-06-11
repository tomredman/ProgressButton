import { type ClassValue, clsx } from "clsx";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// forward refs
export function fr<T = HTMLElement, P = React.HTMLAttributes<T>>(
  component: ForwardRefRenderFunction<T, P>
) {
  const wrapped = forwardRef(component);
  wrapped.displayName = component.name;
  return wrapped;
}

// styled element
export function se<
  T = HTMLElement,
  P extends React.HTMLAttributes<T> = React.HTMLAttributes<T>,
>(Tag: keyof React.ReactHTML, ...classNames: ClassValue[]) {
  const component = fr<T, P>(({ className, ...props }, ref) => (
    // @ts-expect-error Too complicated for TypeScript
    <Tag ref={ref} className={cn(...classNames, className)} {...props} />
  ));
  component.displayName = Tag[0].toUpperCase() + Tag.slice(1);
  return component;
}

// Tailwind color class or HEX color
export type TailwindColorClassOrHexColor = "tailwind" | "hex" | "unknown";
export function isTailwindColorClassOrHexColor(
  str: string
): TailwindColorClassOrHexColor {
  const tailwindColorClassPattern = /^[a-z]+-[0-9]{3}$/;
  const hexColorPattern = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

  if (tailwindColorClassPattern.test(str)) {
    return "tailwind";
  } else if (hexColorPattern.test(str)) {
    return "hex";
  } else {
    return "unknown";
  }
}

export function generateProgressBarBackgroundColorClass(colorString: string) {
  const color = isTailwindColorClassOrHexColor(colorString);
  switch (color) {
    case "tailwind":
      return `[&>*>*]:bg-${colorString}`; // e.g. bg-red-500
    case "hex":
      return `[&>*>*]:bg-[${colorString}]`; // e.g. bg-[#ff0000]
    case "unknown":
      return "[&>*>*]:bg-primany-900"; // shrug emoji
  }
}
