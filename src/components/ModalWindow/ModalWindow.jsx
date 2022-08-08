import { useEffect } from 'react';
import { Modal, Box, Button } from '@mui/material';

import { InputWrapper } from '../InputWrapper';
import { SelectWrapper } from '../SelectWrapper';
import { AddedProductsList } from '../AddedProductsList';

import { useSystemData } from '../../hooks/useSystemData';

import { style } from './constants';
import * as S from './ModalWindow.styles'

export const ModalWindow = ({
    open,
    handleClose,
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
    const {
        products,
        addedProductsArr,
    } = useSystemData()

    useEffect(() => {
        setUnallocatedProducts(products.filter((item) => item.warehouse === ''))
    }, [products])

    useEffect(() => {
        !unallocatedProducts.length && setAddUnallocatedProducts(false)
    }, [unallocatedProducts])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
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
            </Box>
        </Modal>
    );
};
