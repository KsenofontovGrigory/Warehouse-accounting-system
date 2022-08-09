import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addedProductsArrAction } from '../../redux/addedProductsAdd/actions';
import { productsAction } from '../../redux/products/actions';
import { warehousesAction } from '../../redux/warehouses/actions';
import { useProducts } from '../../redux/products/hooks';
import { useAddedProductsArr } from '../../redux/addedProductsAdd/hooks';
import { useWarehouses } from '../../redux/warehouses/hooks';

import { guid } from '../../utils/generatedGUID';

export const useHeaderData = () => {
    const dispatch = useDispatch()
    const { products } = useProducts()
    const { addedProductsArr } = useAddedProductsArr()
    const { warehouses } = useWarehouses()

    const [openProduct, setOpenProduct] = useState(false);
    const [openWarehouse, setOpenWarehouse] = useState(false);

    const handleOpenProduct = () => setOpenProduct(true);
    const handleCloseProduct = () => setOpenProduct(false);
    const handleOpenWarehouse = () => setOpenWarehouse(true);
    const handleCloseWarehouse = () => setOpenWarehouse(false);

    const [productName, setProductName] = useState('')
    const [productQuantity, setProductQuantity] = useState('')
    const [addUnallocatedProducts, setAddUnallocatedProducts] = useState(false)
    const [warehouse, setWarehouse] = useState('');
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [unallocatedProducts, setUnallocatedProducts] = useState([])

    const findProductName = products.find((item) => item.name === productName)

    const selectProduct = () => {
        setAddUnallocatedProducts(true)
        setProductQuantity('')
        setProductName('')
        if (addUnallocatedProducts) {
            dispatch(addedProductsArrAction.setAddedProductsArr([...addedProductsArr, {
                id: guid(),
                name: productName,
                quantity: productQuantity,
                warehouse: name,
            }]))
            setUnallocatedProducts(unallocatedProducts.filter((item) => item.name !== productName))
        }
    }

    const handleChangeProductName = (event) => {
        setProductName(event.target.value)
    }

    const handleChange = (event) => {
        setWarehouse(event.target.value);
    };

    const addProducts = () => {
        const updateProduct = products.map((el) => {
            if (el.name === name && el.warehouse === warehouse) {
                return {
                    ...el,
                    quantity: +(el?.quantity) + +quantity,
                }
            }
            return el
        })
        const newProduct = [...products, {
            name,
            quantity,
            warehouse,
            id: guid()
        }]

        if (name.length && +quantity !== 0) {
            if (products.some((el) => el.name === name && el.warehouse === warehouse)) {
                dispatch(productsAction.setProducts(updateProduct))
            } else {
                dispatch(productsAction.setProducts(newProduct))
            }
            handleCloseProduct()
            setError('')
            setWarehouse('')
            setName('')
            setQuantity('')
        } else {
            setError('Incorrect data entered')
        }
    }

    const addWarehouses = () => {
        if (name.length) {
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
                dispatch(warehousesAction.setWarehouses([...warehouses, {
                    name,
                    id: guid(),
                }]))
                dispatch(productsAction.setProducts([...allProducts].concat(addedProductsArr)))
            } else {
                dispatch(warehousesAction.setWarehouses([...warehouses, {
                    name,
                    id: guid(),
                }]))
            }
            handleCloseWarehouse()
            setError('')
            setWarehouse('')
            setName('')
            setQuantity('')
            setAddUnallocatedProducts(false)
            dispatch(addedProductsArrAction.setAddedProductsArr([]))
        } else {
            setError('Incorrect data entered')
        }
    }

    return {
        handleOpenWarehouse,
        handleOpenProduct,
        handleCloseProduct,
        handleCloseWarehouse,
        openProduct,
        openWarehouse,
        setQuantity,
        warehouse,
        handleChange,
        setAddUnallocatedProducts,
        addUnallocatedProducts,
        setProductQuantity,
        addWarehouses,
        setName,
        error,
        addProducts,
        setUnallocatedProducts,
        unallocatedProducts,
        selectProduct,
        findProductName,
        productName,
        productQuantity,
        handleChangeProductName,
    }
}