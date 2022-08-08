import React from 'react';

import * as S from './InputWrapper.styles';

export const InputWrapper = ({ title, renderAction }) => {
    return (
        <S.ContainerInput>
            <S.ProductTitle>{title}</S.ProductTitle>
            {renderAction}
        </S.ContainerInput>
    );
};
