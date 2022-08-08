import { SET_WAREHOUSES } from './constants';

export const warehousesAction = {
  setWarehouses: (payload) => ({
    type: SET_WAREHOUSES,
    payload,
  }),
};
