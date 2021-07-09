import React from 'react';
import PropTypes from 'prop-types';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Icon from '@pulse/ui-lib/src/components/icons/Icon';
import Spacing, { SIZE } from '@pulse/ui-lib/src/components/spacing/Spacing';
import moment from 'moment';

import { useStory } from '../story-provider';

import {
  SEGMENTS,
  SEGMENTS_DESCRIPTION,
  SALES_CHANNEL_DESCRIPTION,
  REWARD_TYPE,
  DAYS,
  ONLY,
} from './constants';
import { getOfferRulesetEligibleTransationsTitle, capitalize } from './helpers';
import classes from './StoryDetails.scss';

const StoryDetails = ({ isOfferDetailsOpen, onToggleOfferDetails }) => {
  const { activeStory } = useStory();
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
      {activeStory.rewardValue && (
        <Spacing bottom={SIZE.STANDARD}>
          <h1 className={classes.sectionTitle}>
            {activeStory.rewardType === REWARD_TYPE.FIXED &&
              `Spend ${activeStory.currency}${activeStory.minimumSpend} for ${activeStory.currency}${activeStory.rewardValue} Cashback on ${activeStory.merchant.name}!`}
            {activeStory.rewardType === REWARD_TYPE.PERCENTAGE &&
              `Spend ${activeStory.currency} ${activeStory.minimumSpend} for ${activeStory.rewardValue}% Cashback on ${activeStory.merchant.name}!`}
          </h1>
        </Spacing>
      )}

      <p
        className={classes.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: activeStory.description }}
      />

      <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
        <h1 className={classes.sectionTitle}>Terms and Conditions</h1>
      </Spacing>
      <p
        className={classes.description}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: activeStory.termsAndConditions }}
      />

      {activeStory.eligibleSegments.length > 0 && (
        <>
          <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
            <h1 className={classes.sectionTitle}>Eligible cardholders</h1>
          </Spacing>
          <ul className={classes.list}>
            {activeStory.eligibleSegments.includes(SEGMENTS.NEW) && (
              <li className={classes.description}>
                <Spacing bottom={SIZE.TINY}>{SEGMENTS_DESCRIPTION[SEGMENTS.NEW]}</Spacing>
              </li>
            )}
            {activeStory.eligibleSegments.includes(SEGMENTS.LAPSED) && (
              <li className={classes.description}>
                <Spacing bottom={SIZE.TINY}>{SEGMENTS_DESCRIPTION[SEGMENTS.LAPSED]}</Spacing>
              </li>
            )}
            {activeStory.eligibleSegments.includes(SEGMENTS.LOYAL) && (
              <li className={classes.description}>
                <Spacing bottom={SIZE.TINY}>{SEGMENTS_DESCRIPTION[SEGMENTS.LOYAL]}</Spacing>
              </li>
            )}
          </ul>
        </>
      )}

      <>
        <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
          <h1 className={classes.sectionTitle}>Eligible transaction</h1>
        </Spacing>
        <ul className={classes.list}>
          <li className={classes.description}>
            <Spacing bottom={SIZE.TINY}>
              {getOfferRulesetEligibleTransationsTitle({
                rewardFrequency: activeStory.rewardFrequency,
                rewardingRestricted: !activeStory.rewardEveryTransaction,
                restrictedPurchaseCount: activeStory.minimumTransactions,
              })}
              {activeStory.rewardFrequency === ONLY ? 'on ' : ''}
              {activeStory.eligibleDays
                .sort((a, b) => DAYS[a] - DAYS[b])
                .map(
                  (day, index) =>
                    ` ${capitalize(day)}${index < activeStory.eligibleDays.length - 2 ? ', ' : ''}${
                      index === activeStory.eligibleDays.length - 2 ? ` and ` : ''
                    } `
                )}
            </Spacing>
          </li>
        </ul>
      </>

      {activeStory.customerRedemptionLimit && (
        <>
          <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
            <h1 className={classes.sectionTitle}>Maximum Redeem Limit</h1>
          </Spacing>
          <p className={classes.description}>{activeStory.customerRedemptionLimit}</p>
        </>
      )}

      {activeStory.rewardType === REWARD_TYPE.PERCENTAGE && (
        <>
          <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
            <h1 className={classes.sectionTitle}>Percentage discount</h1>
          </Spacing>
          <ul className={classes.list}>
            <li className={classes.description}>{activeStory.rewardValue}</li>
          </ul>
        </>
      )}

      {activeStory.minimumSpend && (
        <>
          <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
            <h1 className={classes.sectionTitle}>Minimum purchase amount</h1>
          </Spacing>
          <ul className={classes.list}>
            <li className={classes.description}>
              {activeStory.currency}
              {activeStory.minimumSpend}
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
        <li className={classes.description}>
          {SALES_CHANNEL_DESCRIPTION[activeStory.salesChannel]}
        </li>
      </ul>

      {activeStory.validFrom && (
        <>
          <Spacing top={SIZE.STANDARD} bottom={SIZE.STANDARD}>
            <h1 className={classes.sectionTitle}>Validity</h1>
          </Spacing>
          <ul className={classes.list}>
            <li className={classes.description}>
              {`${moment(activeStory.validFrom).format('DD MMM YYYY')} at ${moment(
                activeStory.validFrom
              ).format('hh:mm:ss A')}`}
              {activeStory.validTo &&
                ` to ${moment(activeStory.validTo).format('DD MMM YYYY')} at ${moment(
                  activeStory.validTo
                ).format('hh:mm:ss A')}`}
            </li>
          </ul>
        </>
      )}
    </BottomSheet>
  );
};

StoryDetails.propTypes = {
  onToggleOfferDetails: PropTypes.func.isRequired,
  isOfferDetailsOpen: PropTypes.bool.isRequired,
};

export default StoryDetails;
