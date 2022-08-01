import React from 'react';
import {Button} from "@mui/material";

import * as S from './Menu.styles'

export const Menu = () => {
    return (
        <S.Container>
            <Button>Warehouses</Button>
            <Button>Products</Button>
        </S.Container>
    );
};
