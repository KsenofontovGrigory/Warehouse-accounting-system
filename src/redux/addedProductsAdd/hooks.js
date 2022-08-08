import { useAppSelector } from '../hooks';

export const useAddedProductsArr = () => useAppSelector((state) => state.addedProductsArr);
