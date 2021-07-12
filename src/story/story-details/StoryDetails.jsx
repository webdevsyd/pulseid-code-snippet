import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
import { getOfferRulesetEligibleTransationsTitle, capitalize, getOfferTitle } from './helpers';
import classes from './StoryDetails.scss';

const StoryDetails = ({ isOfferDetailsOpen, onToggleOfferDetails }) => {
  const { activeStory } = useStory();
  return (
    <>
      {isOfferDetailsOpen && <div className={classes.backdrop} />}
      <div className={clsx(classes.wrapper, !isOfferDetailsOpen && classes.hide)}>
        <div className={classes.header}>
          <Icon
            icon={['fas', 'times']}
            className={classes.closeIcon}
            onClick={() => onToggleOfferDetails()}
          />
          <h1 className={classes.title}>Offer Details</h1>
        </div>
        <div className={classes.scrollWrapper}>
          <div className={classes.contentWrapper}>
            {activeStory.rewardValue && (
              <Spacing bottom={SIZE.STANDARD}>
                <h1 className={classes.sectionTitle}>
                  {getOfferTitle({
                    rewardType: activeStory.rewardType,
                    currency: activeStory.currency,
                    minimumSpend: activeStory.minimumSpend,
                    merchantName: activeStory.merchant.name,
                    rewardValue: activeStory.rewardValue,
                  })}
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
                          ` ${capitalize(day)}${
                            index < activeStory.eligibleDays.length - 2 ? ', ' : ''
                          }${index === activeStory.eligibleDays.length - 2 ? ` and ` : ''} `
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
          </div>
        </div>
        <div className={classes.footer}>
          <button
            type="button"
            className={classes.closeButton}
            onClick={() => onToggleOfferDetails()}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

StoryDetails.propTypes = {
  onToggleOfferDetails: PropTypes.func.isRequired,
  isOfferDetailsOpen: PropTypes.bool.isRequired,
};

export default StoryDetails;
