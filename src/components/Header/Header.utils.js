import { useState } from 'react';
import { useSystemData } from '../../hooks/useSystemData';
import { addedProductsArrAction } from '../../redux/addedProductsAdd/actions';
import { productsAction } from '../../redux/products/actions';
import { warehousesAction } from '../../redux/warehouses/actions';

export const useHeaderData = () => {
    const [openProduct, setOpenProduct] = useState(false);
    const [openWarehouse, setOpenWarehouse] = useState(false);

    const handleOpenProduct = () => setOpenProduct(true);
    const handleCloseProduct = () => setOpenProduct(false);
    const handleOpenWarehouse = () => setOpenWarehouse(true);
    const handleCloseWarehouse = () => setOpenWarehouse(false);

    const {
        products,
        addedProductsArr,
        guid,
        dispatch,
        warehouses,
    } = useSystemData()

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
                const allProducts = products.map((el, index) => {
                    if (el.name === addedProductsArr[index]?.name && el.warehouse === '') {
                        return {
                            ...el,
                            quantity: el?.quantity - addedProductsArr[index].quantity,
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