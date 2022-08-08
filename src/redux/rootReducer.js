import { combineReducers } from 'redux';

import { productsReducer } from './products/reducer';
import { warehousesReducer } from './warehouses/reducer';
import { addedProductsArrReducer } from './addedProductsAdd/reducer';

const rootReducer = combineReducers({
  products: productsReducer,
  warehouses: warehousesReducer,
  addedProductsArr: addedProductsArrReducer,
});

export default rootReducer;
