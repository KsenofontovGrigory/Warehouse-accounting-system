import React from 'react';
import { MenuItem, Select, TextField } from '@mui/material';

import { textFieldStyle } from '../constants';

import * as S from './SelectWrapper.styles';

export const SelectWrapper = ({
                                  setProductQuantity,
                                  productName,
                                  handleChangeProductName,
                                  unallocatedProducts,
                                  findProductName,
                              }) =>
    <S.SelectContainer>
        <Select
            sx={textFieldStyle}
            value={productName}
            onChange={handleChangeProductName}
        >
            {unallocatedProducts.map((el, index) => {
                return (
                    <MenuItem
                        value={el.name}
                        key={index}
                    >
                        {el.name}
                    </MenuItem>
                )
            })}
        </Select>
        <TextField
            sx={textFieldStyle}
            InputProps={{ inputProps: { min: 1, max: findProductName && +(findProductName?.quantity) } }}
            required
            type='number'
            onChange={(e) => {
                if (+(e.target.value) > findProductName?.quantity) {
                    e.target.value = findProductName?.quantity
                }
                if (+(e.target.value) < 1) {
                    e.target.value = '1'
                }
                setProductQuantity(e.target.value)
            }}
        />
    </S.SelectContainer>
