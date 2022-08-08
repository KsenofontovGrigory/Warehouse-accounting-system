import { SET_PRODUCTS } from './constants';

export const productsAction = {
  setProducts: (payload) => ({
    type: SET_PRODUCTS,
    payload,
  }),
};
