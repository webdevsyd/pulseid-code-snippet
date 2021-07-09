import React from 'react';
import PropTypes from 'prop-types';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Icon from '@pulse/ui-lib/src/components/icons/Icon';
import Spacing, { SIZE } from '@pulse/ui-lib/src/components/spacing/Spacing';
import moment from 'moment';

import {
  SEGMENTS,
  SEGMENTS_DESCRIPTION,
  SALES_CHANNEL_DESCRIPTION,
  REWARD_TYPE,
} from './constants';
import { getOfferRulesetEligibleTransationsTitle } from './helpers';
import classes from './StoryDetails.scss';

const StoryDetails = ({ story, isOfferDetailsOpen, onToggleOfferDetails }) => {
  return (
    <BottomSheet
      onDismiss={() => onToggleOfferDetails()}
      open={isOfferDetailsOpen}
      snapPoints={({ maxHeight }) => [maxHeight * 0.8]}
      header={
        <>
          <Icon
            icon={['fas', 'times']}
            className={classes.closeIcon}
            onClick={() => onToggleOfferDetails()}
          />
          <h1 className={classes.title}>Offer Details</h1>
        </>
      }
      footer={
        <button
          type="button"
          className={classes.closeButton}
          onClick={() => onToggleOfferDetails()}
        >
          Close
        </button>
      }
    >
      {story.rewardValue && (
        <Spacing bottom={SIZE.STANDARD}>
          <h1 className={classes.sectionTitle}>
            {story.rewardType === REWARD_TYPE.FIXED &&
              `Spend ${story.currency}${story.minimumSpend} for ${story.currency}${story.rewardValue} Cashback on ${story.merchant.name}!`}
            {story.rewardType === REWARD_TYPE.PERCENTAGE &&
              `Spend ${story.currency} ${story.minimumSpend} for ${story.rewardValue}% Cashback on ${story.merchant.name}!`}
          </h1>
        </Spacing>
      )}

      <p
        className={classes.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: story.description }}
      />

      <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
        <h1 className={classes.sectionTitle}>Terms and Conditions</h1>
      </Spacing>
      <p
        className={classes.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: story.termsAndConditions }}
      />

      {story.eligibleSegments.length > 0 && (
        <>
          <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
            <h1 className={classes.sectionTitle}>Eligible cardholders</h1>
          </Spacing>
          <ul className={classes.list}>
            {story.eligibleSegments.includes(SEGMENTS.NEW) && (
              <li className={classes.description}>
                <Spacing bottom={SIZE.TINY}>{SEGMENTS_DESCRIPTION[SEGMENTS.NEW]}</Spacing>
              </li>
            )}
            {story.eligibleSegments.includes(SEGMENTS.LAPSED) && (
              <li className={classes.description}>
                <Spacing bottom={SIZE.TINY}>{SEGMENTS_DESCRIPTION[SEGMENTS.LAPSED]}</Spacing>
              </li>
            )}
            {story.eligibleSegments.includes(SEGMENTS.LOYAL) && (
              <li className={classes.description}>
                <Spacing bottom={SIZE.TINY}>{SEGMENTS_DESCRIPTION[SEGMENTS.LOYAL]}</Spacing>
              </li>
            )}
          </ul>
        </>
      )}

      <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
        <h1 className={classes.sectionTitle}>Eligible transaction</h1>
      </Spacing>
      <p className={classes.description}>
        {getOfferRulesetEligibleTransationsTitle({
          rewardFrequency: story.rewardFrequency,
          rewardingRestricted: !story.rewardEveryTransaction,
          restrictedPurchaseCount: story.minimumTransactions,
        })}
      </p>

      {story.customerRedemptionLimit && (
        <>
          <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
            <h1 className={classes.sectionTitle}>Maximum Redeem Limit</h1>
          </Spacing>
          <p className={classes.description}>{story.customerRedemptionLimit}</p>
        </>
      )}

      {story.rewardType === REWARD_TYPE.PERCENTAGE && (
        <>
          <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
            <h1 className={classes.sectionTitle}>Percentage discount</h1>
          </Spacing>
          <ul className={classes.list}>
            <li className={classes.description}>{story.rewardValue}</li>
          </ul>
        </>
      )}

      {story.minimumSpend && (
        <>
          <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
            <h1 className={classes.sectionTitle}>Minimum purchase amount</h1>
          </Spacing>
          <ul className={classes.list}>
            <li className={classes.description}>
              {story.currency}
              {story.minimumSpend}
            </li>
          </ul>
        </>
      )}

      <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
        <h1 className={classes.sectionTitle}>Maximum cashback amount</h1>
      </Spacing>
      <p className={classes.description}>SGD30</p>

      <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
        <h1 className={classes.sectionTitle}>Sales Channel</h1>
      </Spacing>
      <ul className={classes.list}>
        <li className={classes.description}>{SALES_CHANNEL_DESCRIPTION[story.salesChannel]}</li>
      </ul>

      {story.validFrom && (
        <>
          <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
            <h1 className={classes.sectionTitle}>Validity</h1>
          </Spacing>
          <ul className={classes.list}>
            <li className={classes.description}>
              {`${moment(story.validFrom).format('DD MMM YYYY')} at ${moment(
                story.validFrom
              ).format('hh:mm:ss A')}`}
              {story.validTo &&
                ` to ${moment(story.validTo).format('DD MMM YYYY')} at ${moment(
                  story.validTo
                ).format('hh:mm:ss A')}`}
            </li>
          </ul>
        </>
      )}
    </BottomSheet>
  );
};

StoryDetails.defaultProps = {
  story: {
    validFrom: '',
    validTo: '',
    redemptionLimit: null,
    minimumTransactions: null,
    minimumSpend: null,
    customerRedemptionLimit: null,
    rewardFrequency: null,
  },
};

StoryDetails.propTypes = {
  story: PropTypes.shape({
    description: PropTypes.string.isRequired,
    termsAndConditions: PropTypes.string.isRequired,
    rewardType: PropTypes.string.isRequired,
    minimumSpend: PropTypes.number,
    rewardValue: PropTypes.number.isRequired,
    salesChannel: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    rewardFrequency: PropTypes.string,
    customerRedemptionLimit: PropTypes.number,
    rewardEveryTransaction: PropTypes.bool.isRequired,
    redemptionLimit: PropTypes.number,
    minimumTransactions: PropTypes.number,
    eligibleSegments: PropTypes.arrayOf(PropTypes.string).isRequired,

    merchant: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    validFrom: PropTypes.string,
    validTo: PropTypes.string,
  }),
  onToggleOfferDetails: PropTypes.func.isRequired,
  isOfferDetailsOpen: PropTypes.bool.isRequired,
};

export default StoryDetails;
