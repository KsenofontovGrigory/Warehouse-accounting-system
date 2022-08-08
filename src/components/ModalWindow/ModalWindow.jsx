import { useEffect } from 'react';
import {Modal, Box, Button, TextField, Select, MenuItem} from '@mui/material';

import { InputWrapper } from '../InputWrapper';
import { SelectWrapper } from './SelectWrapper/SelectWrapper';
import { AddedProductsList } from './AddedProductsList';

import { useSystemData } from '../../hooks/useSystemData';
import { useModalWindowData } from './ModalWindow.utils';

import {style, textFieldStyle} from './constants';
import * as S from './ModalWindow.styles'

export const ModalWindow = ({open, handleClose, title}) => {
    const {
        warehouses,
        products,
        addedProductsArr,
    } = useSystemData()

    const {
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
    } = useModalWindowData(handleClose)

    const renderActionsName = (
        <TextField
            sx={textFieldStyle}
            required
            type='text'
            inputProps={{maxLength: 20}}
            onChange={(e) => setName(e.target.value)}
        />
    );

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

    const renderActionsWarehouse = (
        <Select
            sx={textFieldStyle}
            value={warehouse}
            onChange={handleChange}
        >
            <MenuItem value=''>
                <em>None</em>
            </MenuItem>
            {warehouses.map((item, index) => (
                    <MenuItem
                        value={item.name}
                        key={index}
                    >
                        {item.name}
                    </MenuItem>
                )
            )}
        </Select>
    );

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
