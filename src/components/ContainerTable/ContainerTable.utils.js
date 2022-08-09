import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addedProductsArrAction } from '../../redux/addedProductsAdd/actions';
import { productsAction } from '../../redux/products/actions';
import { useProducts } from '../../redux/products/hooks';
import { useAddedProductsArr } from '../../redux/addedProductsAdd/hooks';

import { guid } from '../../utils/generatedGUID';

export const useContainerTableData = () =>  {
    const dispatch = useDispatch()
    const { products } = useProducts()
    const { addedProductsArr } = useAddedProductsArr()

    const [productName, setProductName] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [unallocatedProducts, setUnallocatedProducts] = useState([])
    const [open, setOpen] = useState(false);
    const [addUnallocatedProducts, setAddUnallocatedProducts] = useState(false)
    const [showProducts, setShowProducts] = useState(false);
    const [currentWarehouse, setCurrentWarehouse] = useState('')

    const warehouseName = currentWarehouse[0]?.warehouse
    const disabledButton = !unallocatedProducts.length || (!productQuantity.length || !productName.length)

    const selectProduct = () => {
        setProductQuantity('')
        setProductName('')
        if (addUnallocatedProducts) {
            dispatch(addedProductsArrAction.setAddedProductsArr([...addedProductsArr, {
                id: guid(),
                name: productName,
                quantity: productQuantity,
                warehouse: warehouseName,
            }]))
        }
        setUnallocatedProducts(unallocatedProducts.filter((item) => item.name !== productName))
    }

    const findProductName = products.find((item) => item.name === productName)

    const addProducts = () => {
        if (addedProductsArr.length > 0) {
            const allProducts = products.map((el) => {
                if (addedProductsArr.find((item) => item.name === el.name) && el.warehouse === '') {
                    return {
                        ...el,
                        quantity: el?.quantity - addedProductsArr.find((item) => item.quantity === el.quantity).quantity,
                    }
                }
                return el
            })
            dispatch(productsAction.setProducts([...allProducts].concat(addedProductsArr)))
        }
        handleClose()
        setAddUnallocatedProducts(false)
        dispatch(addedProductsArrAction.setAddedProductsArr([]))
    }

    const handleOpen = () => {
        setOpen(true);
        setAddUnallocatedProducts(true);
    }
    const handleClose = () => setOpen(false);
    const handleChangeProductName = (event) => {
        setProductName(event.target.value)
    }
    const closeProducts = () => setShowProducts(false)

    return {
        setUnallocatedProducts,
        unallocatedProducts,
        setAddUnallocatedProducts,
        showProducts,
        closeProducts,
        warehouseName,
        handleOpen,
        currentWarehouse,
        setShowProducts,
        setCurrentWarehouse,
        open,
        handleClose,
        addUnallocatedProducts,
        setProductQuantity,
        productName,
        handleChangeProductName,
        findProductName,
        selectProduct,
        addProducts,
        disabledButton,
    }
}