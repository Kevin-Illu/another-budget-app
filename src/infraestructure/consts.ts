import type { Frequency } from "./database/db";

export type FrequencyObj = {
  value: Frequency;
  label: Capitalize<Frequency>
}

export const FrequencyList: FrequencyObj[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Biweekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'once', label: 'Once' }
]