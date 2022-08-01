import React from 'react';

import {Header} from "../../components/Header";
import {Menu} from "../../components/Menu";
import {NotPositionsPage} from "../../components/NotPositionsPage";

import * as S from './mainPage.styles'

export const MainPage = () => {
    return (
        <S.Container>
            <Header />
            <S.ContainerContent>
                <Menu />
                <NotPositionsPage />
            </S.ContainerContent>
        </S.Container>
    );
};
