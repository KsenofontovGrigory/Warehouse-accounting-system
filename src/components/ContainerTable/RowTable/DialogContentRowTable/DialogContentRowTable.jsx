import React from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';

import { inputNumberValidation } from '../../../../utils/inputNumberValidation';

import * as S from '../RowTable.styles';

export const DialogContentRowTable = ({
    warehouseName,
    newWarehouse,
    handleChangeWarehouse,
    item,
    setQuantity,
    handleMoveProduct,
    filterWarehouse,
}) =>
        <>
            <S.ContainerModal>
                <p>Move from {warehouseName} to</p>
                <Select
                    sx={{width: '200px', color: 'white'}}
                    value={newWarehouse}
                    onChange={handleChangeWarehouse}
                >
                    <MenuItem value=''>
                        <em>Unallocated</em>
                    </MenuItem>
                    {filterWarehouse.map((item) => {
                        return (
                            <MenuItem
                                key={item.name}
                                value={item.name}
                            >
                                {item.name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </S.ContainerModal>
            <S.ContainerModal>
                <p>Quantity</p>
                <TextField
                    sx={{width: '200px'}}
                    required
                    type='number'
                    InputProps={{ inputProps: { min: 1, max: item.quantity } }}
                    defaultValue={item.quantity}
                    onChange={
                        (e) => inputNumberValidation(e, setQuantity, item)
                    }
                />
            </S.ContainerModal>
            <Button onClick={handleMoveProduct}>Move</Button>
        </>