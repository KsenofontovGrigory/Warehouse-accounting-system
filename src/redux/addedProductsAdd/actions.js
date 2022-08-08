import { SET_ADDED_PRODUCTS_ARR } from './constants';

export const addedProductsArrAction = {
  setAddedProductsArr: (payload) => ({
    type: SET_ADDED_PRODUCTS_ARR,
    payload,
  }),
};
