import { useAppSelector } from '../hooks';

export const useProducts = () => useAppSelector((state) => state.products);
