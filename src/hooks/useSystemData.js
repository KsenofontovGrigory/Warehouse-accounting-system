import { useDispatch } from 'react-redux';

import { useProducts } from '../redux/products/hooks';
import { useWarehouses } from '../redux/warehouses/hooks';
import { useAddedProductsArr } from '../redux/addedProductsAdd/hooks';

export const useSystemData = () => {
    const dispatch = useDispatch()

    const {products} = useProducts()
    const {warehouses} = useWarehouses()
    const { addedProductsArr } = useAddedProductsArr()

    const guid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return {
        dispatch,
        products,
        warehouses,
        addedProductsArr,
        guid,
    }
}