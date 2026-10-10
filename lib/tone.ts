// Figma: price UP is red, price DOWN is green. To flip (README text says green-up / red-down), swap the two values below.
export const badgeTone = {
  up: "bg-error/10 text-error",
  down: "bg-success/10 text-success",
  flat: "bg-base-200 text-base-content/60",
} as const;

export const textTone = {
  up: "text-error",
  down: "text-success",
  flat: "text-base-content/55",
} as const;
