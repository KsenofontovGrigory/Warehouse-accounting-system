import { Button } from '@mui/material';

import { ModalWindow } from '../ModalWindow';

import { useSystemData } from '../../hooks/useSystemData';
import { useHeaderData } from './Header.utils';

import * as S from './Header.styles'

export const Header = ({showWarehouses, showProducts, openWarehouses, openProducts}) => {
    const {
        products,
        warehouses,
    } = useSystemData()
    const {
        handleOpenWarehouse,
        handleOpenProduct,
        handleCloseProduct,
        handleCloseWarehouse,
        openProduct,
        openWarehouse,
    } = useHeaderData()

    return (
        <S.Container>
            <Button
                variant={openWarehouses ? 'contained' : 'text'}
                disabled={warehouses?.length === 0} onClick={showWarehouses}
            >
                Warehouses
            </Button>
            <Button
                variant={openProducts ? 'contained' : 'text'}
                disabled={products?.length === 0} onClick={showProducts}
            >
                Products
            </Button>
            <Button
                onClick={handleOpenWarehouse}
            >
                Add warehouse
            </Button>
            <Button
                onClick={handleOpenProduct}
            >
                Add product
            </Button>

            <ModalWindow
                open={openProduct}
                handleClose={handleCloseProduct}
                title='Add product'
            />

            <ModalWindow
                open={openWarehouse}
                handleClose={handleCloseWarehouse}
                title='Add warehouse'
            />
        </S.Container>
    );
};
