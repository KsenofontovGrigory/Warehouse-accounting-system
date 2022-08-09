import { Button, MenuItem, Select, TextField, useMediaQuery } from '@mui/material';

import { ModalWindow } from '../ModalWindow';
import { DrawerWindow } from '../DrawerWindow';

import { useWarehouses } from '../../redux/warehouses/hooks';
import { useProducts } from '../../redux/products/hooks';

import { useHeaderData } from './Header.utils';
import { inputNumberValidation } from '../../utils/inputNumberValidation';

import * as S from './Header.styles'
import { textFieldStyle } from '../ModalWindow/constants';

export const Header = ({showWarehouses, showProducts, openWarehouses, openProducts}) => {
    const isMobile = useMediaQuery('(max-width:768px)');

    const { warehouses } = useWarehouses()
    const { products } = useProducts()

    const {
        setName,
        setQuantity,
        warehouse,
        handleChange,
        handleOpenWarehouse,
        handleOpenProduct,
        openProduct,
        handleCloseProduct,
        openWarehouse,
        handleCloseWarehouse,
        ...props
    } = useHeaderData()

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
            onChange={(e) =>
                inputNumberValidation(e, setQuantity)
            }
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

            {isMobile ? (
                <>
                    <DrawerWindow
                        handleOpen={handleOpenProduct}
                        open={openProduct}
                        handleClose={handleCloseProduct}
                        title='Add product'
                        renderActionsName={renderActionsName}
                        renderActionsQuantity={renderActionsQuantity}
                        renderActionsWarehouse={renderActionsWarehouse}
                        {...props}
                    />
                    <DrawerWindow
                        handleOpen={handleOpenWarehouse}
                        open={openWarehouse}
                        handleClose={handleCloseWarehouse}
                        title='Add warehouse'
                        renderActionsName={renderActionsName}
                        renderActionsQuantity={renderActionsQuantity}
                        renderActionsWarehouse={renderActionsWarehouse}
                        {...props}
                    />
                </>
            ) : (
                <>
                    <ModalWindow
                        open={openProduct}
                        handleClose={handleCloseProduct}
                        title='Add product'
                        renderActionsName={renderActionsName}
                        renderActionsQuantity={renderActionsQuantity}
                        renderActionsWarehouse={renderActionsWarehouse}
                        {...props}
                    />
                    <ModalWindow
                        open={openWarehouse}
                        handleClose={handleCloseWarehouse}
                        title='Add warehouse'
                        renderActionsName={renderActionsName}
                        renderActionsQuantity={renderActionsQuantity}
                        renderActionsWarehouse={renderActionsWarehouse}
                        {...props}
                    />
                </>
            )}

        </S.Container>
    );
};
