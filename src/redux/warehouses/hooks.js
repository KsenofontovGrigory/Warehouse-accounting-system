import { useAppSelector } from '../hooks';

export const useWarehouses = () => useAppSelector((state) => state.warehouses);
