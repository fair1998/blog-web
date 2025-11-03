import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classValue: ClassValue[]): string => {
  return twMerge(clsx(classValue));
};
