export const SEGMENTS = {
  NEW: 'NEW',
  LAPSED: 'LAPSED',
  LOYAL: 'LOYAL',
};

export const SEGMENTS_DESCRIPTION = {
  [SEGMENTS.NEW]: "New customers who haven't purchased in the last 12 months",
  [SEGMENTS.LAPSED]: 'Lapsed customers who purchased 6 - 12 months',
  [SEGMENTS.LOYAL]: 'Loyal customers who have purchased in the last 6 months',
};

export const SALES_CHANNEL_DESCRIPTION = {
  'IN-STORE': 'Only in-store customer transactions will be eligible for this offer',
  'E-COMMERCE': 'Only e-commerce customer transactions will be eligible for this offer',
  ALL: 'All customer transactions will be eligible for this offer',
};

export const REWARD_TYPE = {
  FIXED: 'FIXED',
  PERCENTAGE: 'PERCENTAGE',
};

export const PURCHASE_COUNT_TEXT = {
  2: '2nd Purchase',
  3: '3rd Purchase',
  4: '4th Purchase',
  5: '5th Purchase',
  6: '6th Purchase',
  7: '7th Purchase',
  8: '8th Purchase',
  9: '9th Purchase',
  10: '10th Purchase',
};

export const ONLY = 'ONLY';
export const EVERY = 'EVERY';

export const DAILY = 'DAILY';
export const WEEKLY = 'WEEKLY';
export const MONTHLY = 'MONTHLY';
export const NEVER = 'NEVER';
export const NO_LIMIT = 'NO-LIMIT';
export const LIMITED = 'LIMITED';

export const PURCHASE_LIMIT_FREQUENCY_OPTIONS = [
  { label: 'Only', value: ONLY },
  { label: 'Every', value: EVERY },
];

export const CUSTOMER_REDEEM_LIMIT_OPTIONS = [
  {
    label: 'No Limit',
    value: NO_LIMIT,
  },
  {
    label: 'Limited',
    value: LIMITED,
  },
];

export default {};
