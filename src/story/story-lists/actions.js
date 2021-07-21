import { createAction, createSetterActions } from '@pulse/redux/src/action';
import { v4 as uuidv4 } from 'uuid';

import * as api from '../../offers-api';
import * as authentication from '../../authentication';

import DEFAULT_IMAGE from './default-image.png';
import * as selectors from './selectors';
import { NAME, DEFAULT_LIMIT } from './constants';

const imageObject = image => ({ id: uuidv4(), src: `${image}?random=${uuidv4()}` });

export const [
  setIsFetching,
  setOffers,
  setTotal,
  setCurrentPage,
  setAttributions,
  setHasRefetched,
  setHasError,
] = createSetterActions(NAME, [
  'isFetching',
  'offers',
  'total',
  'currentPage',
  'attributions',
  'hasRefetched',
  'hasError',
]);

export const reset = createAction(`${NAME}/RESET`);

export const fetchOffers = ({ page = 0 } = {}) => async (dispatch, getState) => {
  const state = getState();
  const total = selectors.getTotal(state);
  const currentOffers = selectors.getOffers(state);

  if (total === currentOffers.length && currentOffers.length > 0) return;

  try {
    const params = {
      page,
      limit: DEFAULT_LIMIT,
      xApiKey: authentication.getApiKey(state),
      xApiSecret: authentication.getApiSecret(state),
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
    dispatch(setHasError(true));
    throw new Error(err);
  }
};

export const fetchOffersAttribution = () => async (dispatch, getState) => {
  const state = getState();

  try {
    const params = {
      xApiKey: authentication.getApiKey(state),
      xApiSecret: authentication.getApiSecret(state),
      externalUserId: authentication.getExternalUserId(state),
    };

    const {
      data: { attributions },
    } = await api.getOfferAttributions(params);

    dispatch(setAttributions(attributions));
  } catch (err) {
    dispatch(setHasError(true));
    throw new Error(err);
  }
};

export const resetOffers = () => dispatch => {
  dispatch(setOffers([]));
  dispatch(setHasError(false));
};

export const initialize = () => async dispatch => {
  dispatch(setIsFetching(true));

  try {
    await dispatch(fetchOffers({ page: 0 }));
    await dispatch(fetchOffersAttribution());
  } catch (e) {
    throw new Error(e);
  } finally {
    dispatch(setIsFetching(false));
  }
};
