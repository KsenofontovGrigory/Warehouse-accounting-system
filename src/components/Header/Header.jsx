import React from 'react';

import * as S from './Header.styles'

import logo from '../../assets/images/logo.svg'

export const Header = () => {
    return (
        <S.Container>
            <S.Image src={logo} />
            <S.Title>
                Warehouse Accounting System
            </S.Title>
        </S.Container>
    );
};
