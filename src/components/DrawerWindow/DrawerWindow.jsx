import React, { useEffect } from 'react';
import { Button, SwipeableDrawer } from '@mui/material';

import { InputWrapper } from '../InputWrapper';
import { AddedProductsList } from '../AddedProductsList';
import { SelectWrapper } from '../SelectWrapper';

import { useSystemData } from '../../hooks/useSystemData';

import * as S from '../ModalWindow/ModalWindow.styles';
import * as D from './DrawerWindow.styles';

export const DrawerWindow = ({
    open,
    handleClose,
    handleOpen,
    title,
     setAddUnallocatedProducts,
     addUnallocatedProducts,
     setProductQuantity,
     addWarehouses,
     error,
     addProducts,
     setUnallocatedProducts,
     unallocatedProducts,
     selectProduct,
     findProductName,
     productName,
     productQuantity,
     handleChangeProductName,
     renderActionsName,
     renderActionsQuantity,
     renderActionsWarehouse,
}) => {
    const { products, addedProductsArr } = useSystemData()

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
