import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

import { useAddedProductsListData } from './AddedProductsList.utils';

import * as S from './AddedProductsList.styles'

export const AddedProductsList = ({ item, setUnallocatedProducts, unallocatedProducts }) => {
    const { closeSelectProduct } = useAddedProductsListData(item, setUnallocatedProducts, unallocatedProducts)

    return (
        <S.Container>
            <S.Product>
                {item.name}
            </S.Product>
            :
            <S.Product>
                {item.quantity}
            </S.Product>
            <CloseIcon
                onClick={closeSelectProduct}
                sx={{cursor: 'pointer', color: 'white'}}
            />
        </S.Container>
    );
};
