import React, { useEffect } from 'react';
import { Button, MenuItem, Select, SwipeableDrawer, TextField } from '@mui/material';

import { InputWrapper } from '../InputWrapper';
import { AddedProductsList } from '../AddedProductsList';
import { SelectWrapper } from '../SelectWrapper';

import { useModalWindowData } from '../ModalWindow/ModalWindow.utils';
import { useSystemData } from '../../hooks/useSystemData';

import * as S from '../ModalWindow/ModalWindow.styles';
import * as D from './DrawerWindow.styles';
import { textFieldStyle } from '../ModalWindow/constants';

export const DrawerWindow = ({
    open,
    handleClose,
    handleOpen,
    title,
}) => {
    const { products, warehouses, addedProductsArr } = useSystemData()
    const {
        setQuantity,
        warehouse,
        handleChange,
        setAddUnallocatedProducts,
        addUnallocatedProducts,
        selectProduct,
        setProductQuantity,
        addWarehouses,
        setName,
        error,
        addProducts,
        setUnallocatedProducts,
        unallocatedProducts,
        findProductName,
        productName,
        productQuantity,
        handleChangeProductName,
    } = useModalWindowData(handleClose)

    const renderActionsQuantity = (
        <TextField
            sx={textFieldStyle}
            InputProps={{ inputProps: { min: 0 } }}
            required
            type='number'
            onChange={(e) => {
                if (+(e.target.value) < 1) {
                    e.target.value = '1'
                }
                setQuantity(e.target.value)
            }}
        />
    );

    const renderActionsName = (
        <TextField
            sx={textFieldStyle}
            required
            type='text'
            inputProps={{maxLength: 20}}
            onChange={(e) => setName(e.target.value)}
        />
    );

    const renderActionsWarehouse = (
        <Select
            sx={textFieldStyle}
            value={warehouse}
            onChange={handleChange}
        >
            {warehouses.map((item, index) => (
                    <MenuItem
                        value={item.name}
                        key={index}
                    >
                        {item.name}
                    </MenuItem>
                )
            )}
            <MenuItem value=''>
                <em>None</em>
            </MenuItem>
        </Select>
    );

    useEffect(() => {
        setUnallocatedProducts(products.filter((item) => item.warehouse === ''))
    }, [products])

    useEffect(() => {
        !unallocatedProducts.length && setAddUnallocatedProducts(false)
    }, [unallocatedProducts])

    return (
        <SwipeableDrawer
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            anchor='bottom'
        >
            <D.ContainerDrawer>
                <S.Title>
                    {title}
                </S.Title>
                <InputWrapper
                    title='Name'
                    renderAction={renderActionsName}
                />
                {title === 'Add product' ? (
                    <>
                        <InputWrapper
                            title='Quantity'
                            renderAction={renderActionsQuantity}
                        />
                        <InputWrapper
                            title='Warehouse'
                            renderAction={renderActionsWarehouse}
                        />
                    </>
                ) : (
                    <>
                        <>
                            {addedProductsArr.map((item, index) => (
                                <AddedProductsList
                                    key={index}
                                    item={item}
                                    setUnallocatedProducts={setUnallocatedProducts}
                                    unallocatedProducts={unallocatedProducts}
                                />
                            ))}
                        </>
                        {addUnallocatedProducts ? (
                            <SelectWrapper
                                setProductQuantity={setProductQuantity}
                                productName={productName}
                                handleChangeProductName={handleChangeProductName}
                                unallocatedProducts={unallocatedProducts}
                                findProductName={findProductName}
                            />
                        ) : null}
                        <Button
                            onClick={selectProduct}
                            disabled={!unallocatedProducts.length || addUnallocatedProducts && (!productQuantity.length || !productName.length)}
                        >
                            Add unallocated products
                        </Button>
                    </>
                )}
                <Button onClick={title === 'Add product' ? addProducts : addWarehouses}>Add</Button>
                <S.TextError>{error}</S.TextError>
            </D.ContainerDrawer>
        </SwipeableDrawer>
    );
};
