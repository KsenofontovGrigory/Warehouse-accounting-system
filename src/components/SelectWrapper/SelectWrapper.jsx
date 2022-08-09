import React from 'react';
import { MenuItem, Select, TextField } from '@mui/material';

import { inputNumberValidation } from '../../utils/inputNumberValidation';

import { textFieldStyle } from '../ModalWindow/constants';
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
            onChange={(e) =>
                inputNumberValidation(e, setProductQuantity, findProductName)
            }
        />
    </S.SelectContainer>
