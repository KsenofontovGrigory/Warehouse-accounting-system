import { useState } from 'react';

import { productsAction } from '../../redux/products/actions';
import { warehousesAction } from '../../redux/warehouses/actions';

import { useSystemData } from '../../hooks/useSystemData';

export const useMainPageData = () => {
    const {
        warehouses,
        products,
        dispatch
    } = useSystemData()

    const [openWarehouses, setOpenWarehouses] = useState(false)
    const [openProducts, setOpenProducts] = useState(false)
    const [openDeleteProductNotification, setOpenDeleteProductNotification] = useState(false);

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDeleteProductNotification(false);
    };

    const showWarehouses = () => {
        if(warehouses?.length !== 0) {
            setOpenWarehouses(true)
            setOpenProducts(false)
        } else {
            setOpenWarehouses(false)
        }
    }

    const showProducts = () => {
        if(products?.length !== 0) {
            setOpenWarehouses(false)
            setOpenProducts(true)
        } else {
            setOpenProducts(false)
        }
    }

    const handleDeleteProduct = (id, name) => {
        const findProductId = products.filter((product) => product.id !== id)
        const findProductName = products.filter((product) => product.name === name)
        dispatch(productsAction.setProducts(findProductId))
        findProductName.length === 1 && setOpenDeleteProductNotification(true)
    }

    const handleDeleteWarehouse = (id) => {
        const findWarehouse = warehouses.filter((warehouse) => warehouse.id !== id)
        const findProduct =
            products.filter((product) => product.warehouse === warehouses.find((warehouse) => warehouse.id === id)?.name)
        const findOtherProduct =
            products.filter((product) => product.warehouse !== warehouses.find((warehouse) => warehouse.id === id)?.name)

        dispatch(warehousesAction.setWarehouses(findWarehouse))
        dispatch(productsAction.setProducts([...findOtherProduct, ...findProduct.map((item) => {
            return {
                ...item,
                warehouse: ''
            }
        })]))
    }

    return {
        openWarehouses,
        openProducts,
        openDeleteProductNotification,
        handleCloseNotification,
        showWarehouses,
        showProducts,
        handleDeleteProduct,
        handleDeleteWarehouse,
    }
}