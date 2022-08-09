import { useDispatch } from 'react-redux';

import { addedProductsArrAction } from '../../redux/addedProductsAdd/actions';

import { guid } from '../../utils/generatedGUID';
import { useAddedProductsArr } from '../../redux/addedProductsAdd/hooks';

export const useAddedProductsListData = (item, setUnallocatedProducts, unallocatedProducts) => {
    const dispatch = useDispatch()
    const { addedProductsArr } = useAddedProductsArr()

    const closeSelectProduct = () => {
        dispatch(addedProductsArrAction.setAddedProductsArr(addedProductsArr.filter((el) => el.id !== item.id)))
        setUnallocatedProducts([...unallocatedProducts, {
            id: guid(),
            name: item.name,
            quantity: item.quantity,
            warehouse: '',
        }])
    }

    return {
        closeSelectProduct
    }
}