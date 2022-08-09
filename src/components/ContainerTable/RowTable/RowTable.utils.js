import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { productsAction } from '../../../redux/products/actions';
import { warehousesAction } from '../../../redux/warehouses/actions';
import { useProducts } from '../../../redux/products/hooks';
import { useWarehouses } from '../../../redux/warehouses/hooks';

import { guid } from '../../../utils/generatedGUID';

export const useRowTableData = (item, setShowProducts, setCurrentWarehouse) => {
    const dispatch = useDispatch()
    const { products } = useProducts()
    const { warehouses } = useWarehouses()

    const [edit, setEdit] = useState(false)
    const [warehouse, setWarehouse] = useState(item.warehouse);
    const [newWarehouse, setNewWarehouse] = useState('');
    const [name, setName] = useState(item.name)
    const [quantity, setQuantity] = useState(item.quantity)
    const [open, setOpen] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const findProductsOfWarehouse = products.some((el) => el.warehouse === item.name)

    const handleOpenNotification = () => {
        setOpenNotification(true);
    };

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNotification(false);
    };

    const handleOpenProducts = () => {
        setShowProducts(true)
        setCurrentWarehouse(products.filter((product) => product.warehouse === item.name))
    }
    const handleEditProducts = () => setEdit(true)

    const handleChange = (event) => {
        setWarehouse(event.target.value);
    };

    const handleChangeWarehouse = (event) => {
        setNewWarehouse(event.target.value);
    };

    const handleMoveProduct = () => {
        const productsArr = [...products];
        productsArr.forEach((el) => {
            if (el.warehouse === warehouse && el.name === name) {
                el.quantity = +(el.quantity) - +quantity;
            }
            if (el.warehouse === newWarehouse && el.name === name) {
                el.quantity = +(el.quantity) + +quantity;
            }
            if (el.warehouse !== newWarehouse && el.warehouse === warehouse) {
                productsArr.push({
                    id: guid(),
                    quantity,
                    name,
                    warehouse: newWarehouse,
                })
            }
        })
        const qwe = productsArr.filter((item) => item.name === name && item.warehouse === newWarehouse)[1]
        dispatch(productsAction.setProducts(productsArr.filter((item) => item?.id !== qwe?.id)))
    }

    const handleSave = () => {
        if (quantity) {
            dispatch(productsAction.setProducts(products.map((el) => {
                if (el.id === item.id) {
                    return {
                        ...el,
                        name,
                        quantity,
                        warehouse
                    }
                } else {
                    return el
                }
            })))
        } else {
            dispatch(warehousesAction.setWarehouses(warehouses.map((el) => {
                if (el.id === item.id) {
                    return {
                        ...el,
                        name,
                    }
                } else {
                    return el
                }
            })))
            dispatch(productsAction.setProducts(products.map((el) => {
                if (el.warehouse === item.name) {
                    return {
                        ...el,
                        warehouse: name,
                    }
                } else {
                    return el
                }
            })))
        }
        setEdit(false)
    }

    return {
        edit,
        setName,
        setQuantity,
        warehouse,
        handleChange,
        warehouses,
        findProductsOfWarehouse,
        handleOpenProducts,
        handleOpenNotification,
        handleSave,
        handleEditProducts,
        handleOpen,
        open,
        handleClose,
        newWarehouse,
        handleChangeWarehouse,
        handleMoveProduct,
        openNotification,
        handleCloseNotification,
    }
}