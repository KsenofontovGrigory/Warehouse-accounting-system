import {SET_ADDED_PRODUCTS_ARR} from './constants';

const initialState = {
  addedProductsArr: [],
};

export const addedProductsArrReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDED_PRODUCTS_ARR:
      return {
        ...state,
        addedProductsArr: action.payload,
      };
    default:
      return state;
  }
};
