import React from 'react';
import { Button } from '@mui/material';

import { AddedProductsList } from '../../AddedProductsList';
import { SelectWrapper } from '../../SelectWrapper';

import { useAddedProductsArr } from '../../../redux/addedProductsAdd/hooks';

export const DialogContentContainerTable = ({
    setUnallocatedProducts,
    unallocatedProducts,
    addUnallocatedProducts,
    setProductQuantity,
    productName,
    handleChangeProductName,
    findProductName,
    selectProduct,
    disabledButton,
    addProducts,
}) => {
    const { addedProductsArr } = useAddedProductsArr()

    return (
        <>
            {addedProductsArr.map((item, index) => (
                <AddedProductsList
                    key={index}
                    item={item}
                    setUnallocatedProducts={setUnallocatedProducts}
                    unallocatedProducts={unallocatedProducts}
                />
            ))}
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
                disabled={disabledButton}
            >
                Add unallocated products
            </Button>
            <Button onClick={addProducts}>
                Add
            </Button>
        </>
    );
};
