import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// A helpful function to merge class strings, useful for combining base classes
// with user-provided classes without collision issues.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
