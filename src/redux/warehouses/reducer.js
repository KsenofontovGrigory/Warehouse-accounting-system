import {SET_WAREHOUSES} from './constants';

const initialState = {
  warehouses: [],
};

export const warehousesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload,
      };
    default:
      return state;
  }
};
