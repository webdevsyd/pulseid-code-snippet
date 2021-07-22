import { createAction, createSetterActions } from '@pulse/redux/src/action';
import { v4 as uuidv4 } from 'uuid';

import * as api from '../../offers-api';
import * as authentication from '../../authentication';

import DEFAULT_IMAGE from './default-image.png';
import * as selectors from './selectors';
import { NAME } from './constants';

const imageObject = image => ({ id: uuidv4(), src: `${image}?random=${uuidv4()}` });

export const [
  setIsFetchingOffers,
  setIsFetchingAttributions,
  setOffers,
  setTotal,
  setCurrentPage,
  setAttributions,
  setHasError,
] = createSetterActions(NAME, [
  'isFetchingOffers',
  'isFetchingAttributions',
  'offers',
  'total',
  'currentPage',
  'attributions',
  'hasError',
]);

export const reset = createAction(`${NAME}/RESET`);

export const fetchOffers = ({ page = 0 } = {}) => async (dispatch, getState) => {
  const state = getState();
  const total = selectors.getTotal(state);
  const currentOffers = selectors.getOffers(state);

  if (total === currentOffers.length && currentOffers.length > 0) return;

  dispatch(setIsFetchingOffers(true));

  try {
    const params = {
      page,
      apiKey: authentication.getApiKey(state),
      apiSecret: authentication.getApiSecret(state),
    };

    const {
      data: { offers, totalCount },
    } = await api.getOffers(params);

    const formattedOffers = offers.map(o => ({
      ...o,
      images:
        o.images.length > 0
          ? [...o.images.map(image => imageObject(image))]
          : [imageObject(DEFAULT_IMAGE)],
    }));

    dispatch(setOffers([...currentOffers, ...formattedOffers]));
    dispatch(setTotal(totalCount));
    dispatch(setCurrentPage(page));
  } catch (err) {
    console.log(err);
    throw new Error(err);
  } finally {
    dispatch(setIsFetchingOffers(false));
  }
};

export const fetchOffersAttribution = () => async (dispatch, getState) => {
  const state = getState();
  dispatch(setIsFetchingAttributions(true));

  try {
    const params = {
      apiKey: authentication.getApiKey(state),
      apiSecret: authentication.getApiSecret(state),
      externalUserId: authentication.getExternalUserId(state),
    };

    const {
      data: { attributions },
    } = await api.getOfferAttributions(params);

    dispatch(setAttributions(attributions));
  } catch (err) {
    console.log(err);
    throw new Error(err);
  } finally {
    dispatch(setIsFetchingAttributions(false));
  }
};

export const resetOffers = () => dispatch => {
  dispatch(setOffers([]));
  dispatch(setHasError(false));
};

export const initialize = ({ page = 0 } = {}) => dispatch => {
  dispatch(fetchOffers({ page }));
  dispatch(fetchOffersAttribution());
};

export default {};
