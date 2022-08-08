import React from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';

import { useSystemData } from '../../../../hooks/useSystemData';

import * as S from '../RowTable.styles';

export const DialogContent = ({
    warehouseName,
    newWarehouse,
    handleChangeWarehouse,
    item,
    setQuantity,
    handleMoveProduct,
}) => {
    const { warehouses } = useSystemData()

    return (
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
                    {warehouses.filter((item) => item.name !== warehouseName).map((item) => {
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
                    onChange={(e) => {
                        if (+(e.target.value) > +(item.quantity)) {
                            e.target.value = item.quantity
                        }
                        if (+(e.target.value) < 1) {
                            e.target.value = '1'
                        }

                        setQuantity(e.target.value)
                    }}
                />
            </S.ContainerModal>
            <Button onClick={handleMoveProduct}>Move</Button>
        </>
    );
};
