import {
  REWARD_TYPE,
  PURCHASE_COUNT_TEXT,
  PURCHASE_LIMIT_FREQUENCY_OPTIONS,
  ONLY,
  EVERY,
} from './constants';

export const getPurchaseCountText = ({ restrictedPurchaseCount, rewardingRestricted } = {}) => {
  if (rewardingRestricted && restrictedPurchaseCount) {
    return `${PURCHASE_COUNT_TEXT[restrictedPurchaseCount]}`;
  }

  return 'purchase';
};

export const getrewardFrequencyOptionsLabel = rewardFrequency => {
  if (rewardFrequency) {
    return PURCHASE_LIMIT_FREQUENCY_OPTIONS.find(({ value }) => value === rewardFrequency).label;
  }

  return PURCHASE_LIMIT_FREQUENCY_OPTIONS.find(({ value }) => value === EVERY).label;
};

export const getOfferRulesetEligibleTransationsTitle = ({
  rewardFrequency,
  restrictedPurchaseCount,
  rewardingRestricted,
}) => {
  if (rewardFrequency === EVERY) {
    return `${getrewardFrequencyOptionsLabel(rewardFrequency)} ${getPurchaseCountText({
      restrictedPurchaseCount,
      rewardingRestricted,
    })}`;
  }

  if (rewardFrequency === ONLY) {
    return `${getPurchaseCountText({
      restrictedPurchaseCount,
      rewardingRestricted,
    })} ${getrewardFrequencyOptionsLabel(rewardFrequency).toLowerCase()} `;
  }

  if (!rewardFrequency) {
    return `${getrewardFrequencyOptionsLabel(rewardFrequency)} ${getPurchaseCountText({
      restrictedPurchaseCount,
      rewardingRestricted,
    })}`;
  }

  return '';
};

export const getOfferTitle = ({
  rewardType,
  currency,
  minimumSpend,
  rewardValue,
  merchantName,
}) => {
  if (rewardType === REWARD_TYPE.FIXED) {
    if (!minimumSpend) {
      return `Get ${currency}${rewardValue} Cashback on ${merchantName}!`;
    }

    return `Spend ${currency}${minimumSpend ||
      ''} for ${currency}${rewardValue} Cashback on ${merchantName}!`;
  }

  if (rewardType === REWARD_TYPE.PERCENTAGE) {
    if (!minimumSpend) {
      return `Get ${currency}${rewardValue} Cashback on ${merchantName}!`;
    }

    return `Spend ${currency}${minimumSpend ||
      ''} for %${currency}${rewardValue} Cashback on ${merchantName}!`;
  }

  return '';
};

export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
