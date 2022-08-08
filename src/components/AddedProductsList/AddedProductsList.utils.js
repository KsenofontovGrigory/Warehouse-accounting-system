import { addedProductsArrAction } from '../../redux/addedProductsAdd/actions';

import { useSystemData } from '../../hooks/useSystemData';

export const useAddedProductsListData = (item, setUnallocatedProducts, unallocatedProducts) => {
    const {
        dispatch,
        addedProductsArr,
        guid,
    } = useSystemData()

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