export const givingKinds = ["one-time", "recurring"] as const;

export type GivingKind = (typeof givingKinds)[number];

type GivingOption = {
  kind: GivingKind;
  title: string;
  label: string;
  text: string;
  href: string;
  paystackUrl: string;
};

export const givingOptions: GivingOption[] = [
  {
    kind: "one-time",
    title: "One-Time Giving",
    label: "Give One Time",
    text: "Make a single gift toward ministry operations, outreach, and care for vulnerable families.",
    href: "/support/give/one-time",
    paystackUrl: "https://paystack.shop/pay/ogya",
  },
  {
    kind: "recurring",
    title: "Recurring Giving",
    label: "Give Recurring",
    text: "Set up ongoing support so the prayer army can serve with consistency month after month.",
    href: "/support/give/recurring",
    paystackUrl: "https://paystack.shop/pay/ogyaa",
  },
];

export function getGivingOption(kind: string) {
  return givingOptions.find((option) => option.kind === kind);
}
